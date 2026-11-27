import { Client } from "basic-ftp";

const client = new Client();
client.ftp.verbose = true;

client.trackProgress((info) => {
  console.log(`${info.type}: ${info.name} (${info.bytes} bytes)`);
});

try {
  await client.access({
    host: process.env.FTP_HOST,
    port: Number(process.env.FTP_PORT ?? 21),
    user: process.env.FTP_USER,
    password: process.env.FTP_PASS,
    secure: false,
  });

  await client.ensureDir("www");
  console.log("Remote directory:", await client.pwd());
  await client.clearWorkingDir();
  await client.uploadFromDir("dist");

  console.log("Upload complete!");
} finally {
  client.close();
}
