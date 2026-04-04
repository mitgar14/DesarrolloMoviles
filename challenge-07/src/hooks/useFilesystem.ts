import { useState } from "react";
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

export const useFilesystem = () => {
  const [files, setFiles] = useState<string[]>([]);
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [error, setError] = useState<any>(null);

  const writeFile = async (path: string, data: object | string) => {
    try {
      const content = typeof data === "string" ? data : JSON.stringify(data, null, 2);
      await Filesystem.writeFile({
        path,
        data: content,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });
      setError(null);
    } catch (err) {
      setError(err);
    }
  };

  const readFile = async (path: string) => {
    try {
      const result = await Filesystem.readFile({
        path,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });
      setFileContent(result.data as string);
      setError(null);
    } catch (err) {
      setError(err);
      setFileContent(null);
    }
  };

  const deleteFile = async (path: string) => {
    try {
      await Filesystem.deleteFile({
        path,
        directory: Directory.Documents,
      });
      setFileContent(null);
      setError(null);
    } catch (err) {
      setError(err);
    }
  };

  const listFiles = async (path: string = "") => {
    try {
      const result = await Filesystem.readdir({
        path,
        directory: Directory.Documents,
      });
      setFiles(result.files.map((f) => f.name));
      setError(null);
    } catch (err) {
      setError(err);
      setFiles([]);
    }
  };

  return { files, fileContent, error, writeFile, readFile, deleteFile, listFiles };
};
