import { google } from "googleapis";

export default function handler(req, res) {
  const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URL, REFRESH_TOKEN, ROOT_ID } =
    process.env;
  const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
  );
  oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN,
  });
  const drive = google.drive({ version: "v3", auth: oauth2Client });
  drive.files.list(
    {
      includeItemsFromAllDrives: true,
      supportsAllDrives: true,
      q: `'${ROOT_ID}' in parents and trashed = false`,
      orderBy: "folder, name",
      pageSize: 1000,
      fields:
        "nextPageToken, files(parents,id,name,mimeType,modifiedTime,createdTime,fileExtension,size)",
      driveId: ROOT_ID,
      corpora: "drive",
    },
    (err, resp) => {
      if (err) return res.status(400).json({ error: err });
      const files = resp.data.files;
      if (files.length) {
        res
          .status(200)
          .json(files.filter((file) => file.parents[0] === ROOT_ID));
      } else {
        res.status(404).json({ message: "No files found" });
      }
    }
  );
}
