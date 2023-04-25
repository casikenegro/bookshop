import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import * as fastCsv from 'fast-csv';
const prisma = new PrismaClient();
const sliceArgs = (arg: any[]): any[] => {
  const pieceLength = 1000;
  const args: any[] = [];
  for (let i = 0; i < arg.length; i += pieceLength) {
    const chunk: any[] = arg.slice(i, i + pieceLength);
    args.push(chunk);
  }
  return args;
};
async function main() {
  const options = {
    objectMode: true,
    delimiter: ';',
    quote: null,
    headers: true,
    renameHeaders: false,
    discardUnmappedColumns: true,
  } as any;

  const dataUsers: any[] = [];
  const dataBooks: any[] = [];
  // WELCOM TO CALLBACK HELL :D sorry for this
  const userStream = fs
    .createReadStream(path.join(__dirname, 'users-dump.csv'))
    .pipe(fastCsv.parse(options));

  userStream.on('data', (row: any) => {
    const rowData = {
      id: +row['"User-ID"'].split('"')[1] || undefined,
      location: row['"Location"'].split('"')[1],
      age: +row['"Age"'].split('"')[1] || null,
    } as any;
    dataUsers.push({
      ...rowData,
      email: `test${rowData.id}@test.com`,
    } as any);
  });
  userStream.on('end', () => {
    sliceArgs(dataUsers).forEach(async (args: any[]) => {
      await prisma.user.createMany({
        data: args,
        skipDuplicates: true,
      });
    });
  });
  // Really a callback hell
  const bookStream = fs
    .createReadStream(path.join(__dirname, 'books-dump.csv'))
    .pipe(fastCsv.parse(options));

  bookStream.on('data', (row: any) => {
    const rowData = {
      id: row['"ISBN"'].split('"')[1],
      title: row['"Book-Title"'].split('"')[1] || null,
      author: row['"Book-Author"'].split('"')[1] || 'not name',
      yearPublication: +row['"Year-Of-Publication"'].split('"')[1] || null,
      publisher: row['"Publisher"'].split('"')[1] || null,
      imageUrlS: row['"Image-URL-S"'].split('"')[1] || null,
      imageUrlM: row['"Image-URL-M"'].split('"')[1] || null,
      imageUrlL: row['"Image-URL-L"'].split('"')[1] || null,
    } as any;
    if (rowData.id)
      dataBooks.push({
        ...rowData,
      });
  });
  bookStream.on('end', () => {
    sliceArgs(dataBooks).forEach(async (args: any[]) => {
      await prisma.book.createMany({
        data: args,
      });
    });
  });

  // not migrate rating but ' Foreign key constraint failed on the field'
  // one or many references, users or books do not exist
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
