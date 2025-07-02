import { Card, CardContent } from '@/components/ui/card'
import { FolderOpen } from 'lucide-react'
import React from 'react'


const NotFound = () => {
  return (
    <div className="container mx-auto py-10">

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

    </div>
  );
};

export default NotFound;
