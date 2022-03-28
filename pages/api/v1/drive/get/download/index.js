import { google } from "googleapis";

export default async function handler(req, res) {
  const { id, name, mimeType, size } = req.query;
  const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URL, REFRESH_TOKEN } = process.env;
  const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
  );
  oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN,
  });
  const drive = google.drive({ version: "v3", auth: oauth2Client });
  drive.files.get(
    {
      fileId: id,
      supportsAllDrives: true,
      alt: "media",
    },
    { responseType: "stream" },
    (err, resp) => {
      res.setHeader("Content-Type", mimeType);
      res.setHeader("Content-Disposition", `attachment; filename="${name}"`);
      res.setHeader("Content-Length", size);
      resp.data
        .on("end", () => {
          console.log("Done");
        })
        .on("error", (err) => {
          console.log("Error", err);
        })
        .pipe(res);
    }
  );
}
