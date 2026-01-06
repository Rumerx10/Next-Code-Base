"use client";

import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const ReactTable = () => {
  const [copied, setCopied] = useState(false);

  const codeString = `"use client"
import { HeroDataContext } from "@/components/shared/HeroDataContext";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PdfSvg from "@/svg/announcementsSvg/PdfSvg";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  Download,
  MoreVertical,
  FileText,
} from "lucide-react";
import { useContext, useEffect, useMemo, useState, useCallback } from "react";

interface IRoutineItem {
  id: string;
  title: string;
  publicationDate: string;
  description: string;
  fileUrl?: string;
}

// Generate secure IDs for data
const generateSecureId = () => {
  return crypto.randomUUID ? crypto.randomUUID() : \`item-\${Date.now()}-\${Math.random().toString(36).substr(2, 9)}\`;
};

const AdmissionResult = () => {
  const { setData } = useContext(HeroDataContext);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  
  useEffect(() => {
    setData({
      title: "Admission Result",
      desc: "",
    });
  }, [setData]);

  // Memoize data to prevent unnecessary re-renders
  const RoutineData: IRoutineItem[] = useMemo(() => [
    {
      id: generateSecureId(),
      title: "BBA in PML 5th Batch, Class Routine, 4th Semester",
      publicationDate: "Apr 15, 2025",
      description: "BBA in PML 5th Batch",
      fileUrl: "/documents/bba-pml-5th-batch.pdf",
    },
    {
      id: generateSecureId(),
      title: "B.Sc in NAOE 8th Batch, 1st Semester",
      publicationDate: "Apr 10, 2025",
      description: "B.Sc in NAOE 8th Batch, 1st Sem.",
      fileUrl: "/documents/bsc-naoe-8th-batch.pdf",
    },
    {
      id: generateSecureId(),
      title: "B.Sc in NAOE 5th Batch 3rd Year 2nd Semester",
      publicationDate: "Jul 15, 2025",
      description: "B.Sc in NAOE 5th Batch 3rd Year 2nd Semester",
      fileUrl: "/documents/bsc-naoe-5th-batch.pdf",
    },
    {
      id: generateSecureId(),
      title: "MPSM (10th batch) - 1st Semester",
      publicationDate: "Jul 10, 2025",
      description: "MPSM (9th batch) - 3rd Semester",
      fileUrl: "/documents/mpsm-10th-batch.pdf",
    },
    {
      id: generateSecureId(),
      title: "MMB 7th Batch, 3rd Semester",
      publicationDate: "Jul 30, 2025",
      description: "MPSM (10th batch) - 1st Semester",
      fileUrl: "/documents/mmb-7th-batch.pdf",
    },
    {
      id: generateSecureId(),
      title: "MTHM 5th Batch, 1st Semester",
      publicationDate: "Jul 25, 2025",
      description: "MMB 7th Batch, 3rd Semester",
      fileUrl: "/documents/mthm-5th-batch.pdf",
    },
    {
      id: generateSecureId(),
      title: "B.Sc in NAOE 6th Batch Class Routine, 4th Semester",
      publicationDate: "Aug 10, 2025",
      description: "MTHM 5th Batch, 1st Semester",
      fileUrl: "/documents/bsc-naoe-6th-batch.pdf",
    },
    {
      id: generateSecureId(),
      title: "BBA in PML 6th Batch, Class Routine, 3rd Semester",
      publicationDate: "Aug 05, 2025",
      description: "NAOE 6th Batch",
      fileUrl: "/documents/bba-pml-6th-batch.pdf",
    },
    {
      id: generateSecureId(),
      title: "B.Sc in NAOE 7th Batch, 3rd Semester",
      publicationDate: "Sep 01, 2025",
      description: "BBA in PML 6th Batch",
      fileUrl: "/documents/bsc-naoe-7th-batch.pdf",
    },
    {
      id: generateSecureId(),
      title: "MBA in Maritime Business 8th Batch, Class Routine, 1st Semester",
      publicationDate: "Sep 05, 2025",
      description: "B.Sc in NAOE 7th Batch",
      fileUrl: "/documents/mba-maritime-8th-batch.pdf",
    },
  ], []);

  // Secure download handler
  const handleDownload = useCallback((fileUrl?: string) => {
    if (!fileUrl) {
      alert("File not available");
      return;
    }
    
    // Validate URL to prevent potential security issues
    const isValidUrl = fileUrl.startsWith('/documents/') && fileUrl.endsWith('.pdf');
    
    if (!isValidUrl) {
      console.error('Invalid file URL');
      return;
    }
    
    // Create a secure download link
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileUrl.split('/').pop() || 'document.pdf';
    link.target = '_blank';
    link.rel = 'noopener noreferrer'; // Security best practice
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const columnHelper = createColumnHelper<IRoutineItem>();

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "serial",
        header: "SL",
        cell: ({ row }) => {
          const rowIndex = row.index + 1;
          return (
            <div className="font-medium text-gray-600">
              {String(rowIndex).padStart(2, "0")}
            </div>
          );
        },
        size: 80,
      }),
      columnHelper.accessor("title", {
        header: "Title",
        cell: (info) => (
          <div className="max-w-xs md:max-w-md lg:max-w-lg">
            <div className="font-medium text-gray-900">{info.getValue()}</div>
          </div>
        ),
        size: 350,
      }),
      columnHelper.accessor("publicationDate", {
        header: "Publication Date",
        cell: (info) => (
          <div className="text-gray-700 whitespace-nowrap">
            {info.getValue()}
          </div>
        ),
        size: 150,
      }),
      columnHelper.accessor("description", {
        header: "Description",
        cell: (info) => (
          <div className="text-gray-600 max-w-xs">
            {info.getValue()}
          </div>
        ),
        size: 250,
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDownload(row.original.fileUrl)}
              className="h-10 w-10 border-gray-200 hover:border-blue-600 hover:bg-blue-50"
              title="Download PDF"
              aria-label={\`Download \${row.original.title}\`}
            >
              <PdfSvg className="w-5 h-5" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-10 w-10"
                  aria-label="More options"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => handleDownload(row.original.fileUrl)}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" />
                  View Details
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
        size: 120,
      }),
    ],
    [columnHelper, handleDownload]
  );

  const table = useReactTable({
    data: RoutineData,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const pageSizeOptions = [5, 10, 15, 20, 25];

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-3xl md:text-4xl text-dpViolet">
                Admission Results
              </CardTitle>
              <CardDescription className="text-gray-600 mt-2">
                Browse and download admission results and routines
              </CardDescription>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search results..."
                  value={globalFilter ?? ""}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  className="pl-10 w-full"
                  aria-label="Search admission results"
                />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <div className="min-w-full">
              <table className="w-full border-collapse">
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr
                      key={headerGroup.id}
                      className="bg-gradient-to-r from-slate-800 to-slate-900 text-white"
                    >
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="border-b border-slate-600 px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider"
                          style={{ width: header.getSize() }}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {table.getRowModel().rows.length > 0 ? (
                    table.getRowModel().rows.map((row) => (
                      <tr
                        key={row.id}
                        className="hover:bg-blue-50 transition-colors duration-150"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td
                            key={cell.id}
                            className="px-6 py-4 text-sm border-b border-gray-100"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={columns.length}
                        className="px-6 py-12 text-center text-gray-500"
                      >
                        <div className="flex flex-col items-center justify-center gap-2">
                          <FileText className="h-12 w-12 text-gray-300" />
                          <p className="text-lg">No results found</p>
                          <p className="text-sm">
                            Try adjusting your search criteria
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Showing</span>
              <Select
                value={table.getState().pagination.pageSize.toString()}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger className="w-20 h-8">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  {pageSizeOptions.map((option) => (
                    <SelectItem key={option} value={option.toString()}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span>entries per page</span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                className="h-8 w-8 p-0 hidden sm:inline-flex"
                aria-label="First page"
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="h-8 w-8 p-0"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="flex items-center gap-1">
                <span className="text-sm text-gray-600">
                  Page{" "}
                  <strong>
                    {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                  </strong>
                </span>
                
                <div className="hidden md:flex items-center gap-1">
                  {Array.from(
                    { length: Math.min(5, table.getPageCount()) },
                    (_, i) => {
                      const pageIndex = table.getState().pagination.pageIndex;
                      const startPage = Math.max(
                        0,
                        Math.min(
                          pageIndex - 2,
                          table.getPageCount() - 5
                        )
                      );
                      const page = startPage + i + 1;
                      
                      if (page > table.getPageCount()) return null;
                      
                      return (
                        <Button
                          key={page}
                          variant={
                            table.getState().pagination.pageIndex + 1 === page
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() => table.setPageIndex(page - 1)}
                          className="h-8 w-8 p-0"
                        >
                          {page}
                        </Button>
                      );
                    }
                  )}
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="h-8 w-8 p-0"
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
                className="h-8 w-8 p-0 hidden sm:inline-flex"
                aria-label="Last page"
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="text-sm text-gray-600">
              Total: {RoutineData.length} results
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdmissionResult;
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 w-full border border-gray-300 rounded-lg overflow-hidden bg-white">
      {/* Header */}
      <div className="flex items-center justify-between bg-gray-900 text-white px-4 py-3">
        <h3 className="font-semibold text-sm">React Table Component Code</h3>
        <Button
          onClick={handleCopy}
          variant="ghost"
          size="sm"
          className="text-white hover:bg-gray-800 h-8 px-3"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          <span className="ml-2 text-xs">{copied ? "Copied!" : "Copy"}</span>
        </Button>
      </div>

      {/* Code Display */}
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language="typescript"
          style={atomOneDark}
          customStyle={{
            margin: 0,
            padding: "1rem",
            fontSize: "13px",
            lineHeight: "1.5",
            minHeight: "200px",
            backgroundColor: "#1a1a1a",
          }}
          showLineNumbers
          lineNumberStyle={{
            color: "#666",
            marginRight: "1rem",
            userSelect: "none",
          }}
          wrapLines
          lineProps={{ style: { whiteSpace: "pre-wrap" } }}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default ReactTable;
