import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, FolderOpen } from "lucide-react";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col gap-10 container mx-auto py-10">
      {[].length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-gray-500">
              <FolderOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No modules found</h3>
              <p>Create new modules by clicking on add module button.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {[].length === 0 && (
        <div className="text-center text-gray-500 py-10 shadow-sm border rounded-xl">
          <CheckCircle className="h-12 w-12 mx-auto text-gray-400" />
          <h3 className="mt-2 text-lg font-medium">No tasks found</h3>
          <p className="mt-1">
            Create new task
          </p>
        </div>
      )}
    </div>
  );
};

export default NotFound;
