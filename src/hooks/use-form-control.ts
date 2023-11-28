import { useEffect, useState } from "react";
import { selectActiveUser } from "@/redux/slices/user.slice";
import { CldUploadWidgetProps, CldUploadWidgetResults } from "next-cloudinary";
import { FieldValues, Path, PathValue } from "react-hook-form";
import { IFormField } from "@/components/shared/form";
import { maxUploadSize } from "@/utils/constants";
import { toast } from "react-toastify";
import { useAppSelector } from "@/redux/util";

export default function useFormField<Y extends FieldValues>(
  field: any,
  setValue: any
) {
  const { type, name, options } = field;
  const [fileUploadMessage, setFileUploadMessage] = useState<{
    type?: string;
    message: string;
  }>({ message: options?.helperMessage || "" });
  const userData = useAppSelector(selectActiveUser);

  // Handle file upload success
  const handleUploadSuccess: CldUploadWidgetProps["onSuccess"] = ({ info }) => {
    if (!info || typeof info === "string") return;

    const data = info as {
      secure_url: string;
      original_filename: string;
      format: string;
    };
    setValue(name as Path<Y>, data.secure_url as PathValue<Y, Path<Y>>);

    setFileUploadMessage({
      type: "success",
      message: `${data.original_filename}.${data.format}`,
    });
  };

  // Handle file upload
  const handleUpload = (
    { info }: CldUploadWidgetResults,
    options?: IFormField<Y>["options"]
  ) => {
    if (!info || typeof info === "string") return;

    const data = info as { file: { size: number; type: string } };
    const fileSize = data.file.size;
    const fileExt = data.file.type.split("/")[1];
    const maxSize = options?.maxFileSize || maxUploadSize;

    if (
      fileSize > maxSize ||
      !options?.clientAllowedFormats?.includes(fileExt)
    ) {
      setValue(name as Path<Y>, undefined as PathValue<Y, Path<Y>>);
      setFileUploadMessage({
        type: "error",
        message: options?.helperMessage || "",
      });
      setTimeout(
        () => toast.info("Close the upload dialog and try again..."),
        2500
      );
    }
  };

  // Show logged in user's image name
  useEffect(() => {
    if ("type" in field && type === "file") {
      const fileName = userData?.imageUrl?.split("/").at(-1);
      if (fileName)
        setFileUploadMessage({
          type: "success",
          message: fileName,
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData?.imageUrl]);

  return { fileUploadMessage, handleUpload, handleUploadSuccess };
}
