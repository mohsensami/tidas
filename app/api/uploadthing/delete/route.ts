import { UTApi } from "uploadthing/server";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { fileUrl } = await request.json();

    if (!fileUrl) {
      return NextResponse.json(
        { success: false, message: "File URL is required" },
        { status: 400 }
      );
    }

    // Extract file key from URL
    // UploadThing URLs are like: https://utfs.io/f/{fileKey} or https://uploadthing.com/f/{fileKey}
    let fileKey: string;

    try {
      const url = new URL(fileUrl);
      // Get the last path segment as file key
      const pathParts = url.pathname.split("/").filter(Boolean);
      fileKey = pathParts[pathParts.length - 1];

      if (!fileKey) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid file URL: Could not extract file key",
          },
          { status: 400 }
        );
      }
    } catch (error) {
      return NextResponse.json(
        { success: false, message: "Invalid file URL format" },
        { status: 400 }
      );
    }

    const utapi = new UTApi();
    const result: any = await utapi.deleteFiles([fileKey]);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "File deleted successfully",
      });
    } else {
      // Log the error for debugging
      console.error("UploadThing delete error:", result);
      return NextResponse.json(
        {
          success: false,
          message: result.error || "Failed to delete file from UploadThing",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error deleting file:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
