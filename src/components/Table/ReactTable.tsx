"use client";

import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const ReactTable = () => {
  const [copied, setCopied] = useState(false);

  const codeString = `"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import toast from "react-hot-toast";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";
import {
  Check,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  Search,
  SlidersHorizontal,
  Eye,
  Pencil,
  Trash2,
  X,
  TriangleAlert,
} from "lucide-react";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  score: number;
  status: "active" | "inactive";
  joinDate: string;
};

const DEMO_USERS: User[] = [
  { id: 1, name: "Ava Thompson", email: "ava.thompson@example.com", role: "Admin", department: "Engineering", score: 92, status: "active", joinDate: "2022-03-14" },
  { id: 2, name: "Liam Carter", email: "liam.carter@example.com", role: "Developer", department: "Engineering", score: 78, status: "active", joinDate: "2022-07-01" },
  { id: 3, name: "Sophia Martinez", email: "sophia.martinez@example.com", role: "Designer", department: "Design", score: 85, status: "inactive", joinDate: "2021-11-20" },
  { id: 4, name: "Noah Wilson", email: "noah.wilson@example.com", role: "Manager", department: "Sales", score: 64, status: "active", joinDate: "2023-01-09" },
  { id: 5, name: "Emma Davis", email: "emma.davis@example.com", role: "Developer", department: "Engineering", score: 88, status: "active", joinDate: "2020-09-30" },
  { id: 6, name: "Oliver Brown", email: "oliver.brown@example.com", role: "Support", department: "Support", score: 55, status: "inactive", joinDate: "2023-05-17" },
  { id: 7, name: "Isabella Garcia", email: "isabella.garcia@example.com", role: "Editor", department: "Marketing", score: 71, status: "active", joinDate: "2022-02-11" },
  { id: 8, name: "Elijah Miller", email: "elijah.miller@example.com", role: "Developer", department: "Engineering", score: 96, status: "active", joinDate: "2019-12-05" },
  { id: 9, name: "Mia Rodriguez", email: "mia.rodriguez@example.com", role: "Viewer", department: "Support", score: 42, status: "inactive", joinDate: "2023-08-22" },
  { id: 10, name: "Lucas Anderson", email: "lucas.anderson@example.com", role: "Manager", department: "Sales", score: 80, status: "active", joinDate: "2021-04-18" },
  { id: 11, name: "Amelia Thomas", email: "amelia.thomas@example.com", role: "Designer", department: "Design", score: 73, status: "active", joinDate: "2022-10-02" },
  { id: 12, name: "Mason Jackson", email: "mason.jackson@example.com", role: "Developer", department: "Engineering", score: 61, status: "inactive", joinDate: "2020-06-25" },
  { id: 13, name: "Harper White", email: "harper.white@example.com", role: "Editor", department: "Marketing", score: 90, status: "active", joinDate: "2023-03-30" },
  { id: 14, name: "Ethan Harris", email: "ethan.harris@example.com", role: "Admin", department: "Engineering", score: 99, status: "active", joinDate: "2018-01-15" },
  { id: 15, name: "Evelyn Martin", email: "evelyn.martin@example.com", role: "Support", department: "Support", score: 48, status: "inactive", joinDate: "2023-09-10" },
  { id: 16, name: "Logan Thompson", email: "logan.thompson@example.com", role: "Viewer", department: "Sales", score: 67, status: "active", joinDate: "2022-12-01" },
  { id: 17, name: "Abigail Lee", email: "abigail.lee@example.com", role: "Designer", department: "Design", score: 76, status: "active", joinDate: "2021-07-08" },
  { id: 18, name: "Jacob Walker", email: "jacob.walker@example.com", role: "Developer", department: "Engineering", score: 83, status: "inactive", joinDate: "2020-02-19" },
  { id: 19, name: "Emily Hall", email: "emily.hall@example.com", role: "Manager", department: "Marketing", score: 58, status: "active", joinDate: "2023-06-27" },
  { id: 20, name: "Benjamin Allen", email: "benjamin.allen@example.com", role: "Editor", department: "Sales", score: 69, status: "active", joinDate: "2022-05-05" },
];

// Re-assigns sequential ids so pasting/duplicating demo rows can never collide.
const normalizeUsers = (users: User[]): User[] =>
  users.map((user, index) => ({ ...user, id: index + 1 }));

const PAGE_SIZE_OPTIONS = ["5", "10", "20", "All"] as const;
const SCORE_SORT_OPTIONS = [
  { value: "all", label: "Sort: Default" },
  { value: "desc", label: "Score: High to Low" },
  { value: "asc", label: "Score: Low to High" },
] as const;
const ROLE_OPTIONS = [
  { value: "all", label: "All Roles" },
  ...Array.from(new Set(DEMO_USERS.map((u) => u.role)))
    .sort()
    .map((role) => ({ value: role, label: role })),
];

const AVATAR_COLORS = [
  "bg-indigo-100 text-indigo-700",
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-700",
  "bg-sky-100 text-sky-700",
  "bg-purple-100 text-purple-700",
];

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const getAvatarColor = (name: string) => {
  const hash = name
    .split("")
    .reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
};

// current/total are 1-indexed page numbers. Collapses runs of pages into "..."
// once there are more than 7 pages, always keeping the first, last, and the
// pages immediately around the current one visible.
const getPageNumbers = (current: number, total: number): (number | "ellipsis")[] => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "ellipsis")[] = [1];
  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);

  if (left > 2) pages.push("ellipsis");
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < total - 1) pages.push("ellipsis");
  pages.push(total);

  return pages;
};

const FilterDropdown = ({
  value,
  onChange,
  options,
  isOpen,
  onToggle,
  onClose,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) => {
  const selectedLabel = options.find((opt) => opt.value === value)?.label ?? value;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm hover:border-gray-400 hover:bg-gray-50"
      >
        {selectedLabel}
        <ChevronDown
          size={14}
          className={`text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={onClose} />
          <div className="absolute left-0 z-20 mt-2 w-max min-w-full rounded-lg border border-gray-200 bg-white p-1.5 shadow-lg">
            {options.map((opt) => {
              const selected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    onClose();
                  }}
                  className={`flex w-full items-center justify-between gap-4 rounded-md px-2.5 py-1.5 text-left text-sm whitespace-nowrap ${
                    selected
                      ? "bg-indigo-50 font-medium text-indigo-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {opt.label}
                  {selected && <Check size={14} />}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

const Modal = ({
  title,
  onClose,
  children,
  footer,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="fixed inset-0 bg-gray-900/50" onClick={onClose} />
    <div className="relative w-full max-w-md rounded-xl border border-gray-200 bg-white shadow-xl">
      <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
        <h2 className="text-base font-semibold text-gray-900">{title}</h2>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        >
          <X size={18} />
        </button>
      </div>
      <div className="px-5 py-4">{children}</div>
      {footer && (
        <div className="flex items-center justify-end gap-2 border-t border-gray-200 px-5 py-4">
          {footer}
        </div>
      )}
    </div>
  </div>
);

const FIELD_CLASS =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm hover:border-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30";
const LABEL_CLASS = "mb-1 block text-xs font-medium text-gray-500";

type MenuKey = "status" | "role" | "sort" | "pageSize" | "columns";
type ModalState =
  | { mode: "view"; user: User }
  | { mode: "edit"; user: User }
  | { mode: "delete"; user: User }
  | null;

const UsersTablePage = () => {
  const [data, setData] = useState<User[]>(() => normalizeUsers(DEMO_USERS));
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const [modal, setModal] = useState<ModalState>(null);
  const [editForm, setEditForm] = useState<User | null>(null);

  // Next's Fast Refresh preserves this component's state across edits, so
  // useState's initial value alone keeps showing the row count from before
  // you last edited DEMO_USERS. Re-running this effect when the module
  // constant's reference changes (i.e. a dev edit re-evaluated the file)
  // resyncs it without needing a manual browser refresh.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setData(normalizeUsers(DEMO_USERS));
  }, [DEMO_USERS]);

  const toggleMenu = (key: MenuKey) =>
    setOpenMenu((current) => (current === key ? null : key));
  const closeMenu = () => setOpenMenu(null);

  const closeModal = () => {
    setModal(null);
    setEditForm(null);
  };

  useEffect(() => {
    if (!modal) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [modal]);

  const openView = (user: User) => setModal({ mode: "view", user });
  const openEdit = (user: User) => {
    setModal({ mode: "edit", user });
    setEditForm({ ...user });
  };
  const openDelete = (user: User) => setModal({ mode: "delete", user });

  const handleSaveEdit = () => {
    if (!editForm) return;
    setData((prev) => prev.map((u) => (u.id === editForm.id ? editForm : u)));
    toast.success(`${editForm.name} updated`);
    closeModal();
  };

  const handleConfirmDelete = () => {
    if (modal?.mode !== "delete") return;
    setData((prev) => prev.filter((u) => u.id !== modal.user.id));
    toast.success(`${modal.user.name} deleted`);
    closeModal();
  };

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${getAvatarColor(
                row.original.name,
              )}`}
            >
              {getInitials(row.original.name)}
            </span>
            <span className="font-medium text-gray-900">{row.original.name}</span>
          </div>
        ),
      },
      { accessorKey: "email", header: "Email" },
      {
        accessorKey: "role",
        header: "Role",
        filterFn: (row, columnId, filterValue) =>
          filterValue === "all" || filterValue === undefined
            ? true
            : row.getValue(columnId) === filterValue,
      },
      { accessorKey: "department", header: "Department" },
      {
        accessorKey: "score",
        header: "Score",
        cell: ({ getValue }) => {
          const score = getValue<number>();
          const color =
            score >= 80
              ? "text-emerald-600"
              : score >= 50
                ? "text-amber-600"
                : "text-rose-600";
          return <span className={`font-semibold ${color}`}>{score}</span>;
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        filterFn: (row, columnId, filterValue) =>
          filterValue === "all" || filterValue === undefined
            ? true
            : row.getValue(columnId) === filterValue,
        cell: ({ getValue }) => {
          const status = getValue<User["status"]>();
          const isActive = status === "active";
          return (
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium capitalize ring-1 ring-inset ${
                isActive
                  ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20"
                  : "bg-gray-100 text-gray-600 ring-gray-500/10"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  isActive ? "bg-emerald-500" : "bg-gray-400"
                }`}
              />
              {status}
            </span>
          );
        },
      },
      {
        accessorKey: "joinDate",
        header: "Joined",
        cell: ({ getValue }) =>
          new Date(getValue<string>()).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
      },
      {
        id: "actions",
        header: "Actions",
        enableSorting: false,
        enableHiding: false,
        enableGlobalFilter: false,
        cell: ({ row }) => (
          <div className="flex items-center gap-1">
            <button
              type="button"
              title="View"
              onClick={() => openView(row.original)}
              className="rounded-md p-1.5 text-gray-400 hover:bg-indigo-50 hover:text-indigo-600"
            >
              <Eye size={16} />
            </button>
            <button
              type="button"
              title="Edit"
              onClick={() => openEdit(row.original)}
              className="rounded-md p-1.5 text-gray-400 hover:bg-amber-50 hover:text-amber-600"
            >
              <Pencil size={16} />
            </button>
            <button
              type="button"
              title="Delete"
              onClick={() => openDelete(row.original)}
              className="rounded-md p-1.5 text-gray-400 hover:bg-rose-50 hover:text-rose-600"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  const statusFilterValue =
    (table.getColumn("status")?.getFilterValue() as string | undefined) ??
    "all";

  const roleFilterValue =
    (table.getColumn("role")?.getFilterValue() as string | undefined) ?? "all";

  const scoreSortValue = (() => {
    const sort = table.getState().sorting.find((s) => s.id === "score");
    if (!sort) return "all";
    return sort.desc ? "desc" : "asc";
  })();

  const pageSize = table.getState().pagination.pageSize;
  const pageSizeValue = pageSize >= data.length ? "All" : String(pageSize);
  const pageIndex = table.getState().pagination.pageIndex;
  const totalRows = table.getFilteredRowModel().rows.length;
  const rangeStart = totalRows === 0 ? 0 : pageIndex * pageSize + 1;
  const rangeEnd = Math.min((pageIndex + 1) * pageSize, totalRows);

  return (
    <>
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your team members and their account permissions.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center gap-3 border-b border-gray-200 p-4">
            {/* Global search */}
            <div className="relative min-w-55 flex-1">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search all columns..."
                value={table.getState().globalFilter ?? ""}
                onChange={(e) => table.setGlobalFilter(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm text-gray-700 shadow-sm placeholder:text-gray-400 hover:border-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              />
            </div>

            <FilterDropdown
              value={statusFilterValue}
              onChange={(value) =>
                table.getColumn("status")?.setFilterValue(value === "all" ? undefined : value)
              }
              options={[
                { value: "all", label: "All Statuses" },
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
              ]}
              isOpen={openMenu === "status"}
              onToggle={() => toggleMenu("status")}
              onClose={closeMenu}
            />

            <FilterDropdown
              value={roleFilterValue}
              onChange={(value) =>
                table.getColumn("role")?.setFilterValue(value === "all" ? undefined : value)
              }
              options={ROLE_OPTIONS}
              isOpen={openMenu === "role"}
              onToggle={() => toggleMenu("role")}
              onClose={closeMenu}
            />

            <FilterDropdown
              value={scoreSortValue}
              onChange={(value) => {
                if (value === "all") table.resetSorting();
                else table.setSorting([{ id: "score", desc: value === "desc" }]);
              }}
              options={SCORE_SORT_OPTIONS.map((opt) => ({ ...opt }))}
              isOpen={openMenu === "sort"}
              onToggle={() => toggleMenu("sort")}
              onClose={closeMenu}
            />

            <FilterDropdown
              value={pageSizeValue}
              onChange={(value) =>
                table.setPageSize(value === "All" ? data.length : Number(value))
              }
              options={PAGE_SIZE_OPTIONS.map((opt) => ({
                value: opt,
                label: opt === "All" ? "Show All" : `Show ${opt}`,
              }))}
              isOpen={openMenu === "pageSize"}
              onToggle={() => toggleMenu("pageSize")}
              onClose={closeMenu}
            />

            {/* Column visibility */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleMenu("columns")}
                className="flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm hover:border-gray-400 hover:bg-gray-50"
              >
                <SlidersHorizontal size={14} />
                Columns
              </button>
              {openMenu === "columns" && (
                <>
                  <div className="fixed inset-0 z-10" onClick={closeMenu} />
                  <div className="absolute right-0 z-20 mt-2 w-52 rounded-lg border border-gray-200 bg-white p-1.5 shadow-lg">
                    {table
                      .getAllLeafColumns()
                      .filter((column) => column.getCanHide())
                      .map((column) => (
                        <label
                          key={column.id}
                          className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <input
                            type="checkbox"
                            checked={column.getIsVisible()}
                            onChange={column.getToggleVisibilityHandler()}
                            className="h-3.5 w-3.5 accent-indigo-600"
                          />
                          <span className="capitalize">{column.id}</span>
                        </label>
                      ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      const sorted = header.column.getIsSorted();
                      return (
                        <th
                          key={header.id}
                          onClick={header.column.getToggleSortingHandler()}
                          className={`px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 whitespace-nowrap ${
                            header.column.getCanSort()
                              ? "cursor-pointer select-none hover:text-gray-700"
                              : ""
                          }`}
                        >
                          <div className="flex items-center gap-1">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                            {header.column.getCanSort() &&
                              (sorted === "asc" ? (
                                <ChevronUp size={14} />
                              ) : sorted === "desc" ? (
                                <ChevronDown size={14} />
                              ) : (
                                <ChevronsUpDown size={14} className="text-gray-300" />
                              ))}
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-gray-100">
                {table.getRowModel().rows.length === 0 && (
                  <tr>
                    <td
                      colSpan={table.getAllLeafColumns().length}
                      className="px-4 py-10 text-center text-gray-400"
                    >
                      No users found.
                    </td>
                  </tr>
                )}
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="transition-colors hover:bg-gray-50/80">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3 text-gray-700">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 p-4">
            <span className="text-sm text-gray-500">
              Showing <span className="font-medium text-gray-700">{rangeStart}</span>–
              <span className="font-medium text-gray-700">{rangeEnd}</span> of{" "}
              <span className="font-medium text-gray-700">{totalRows}</span> results
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                First
              </button>
              <button
                type="button"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Prev
              </button>
              {getPageNumbers(pageIndex + 1, Math.max(table.getPageCount(), 1)).map(
                (page, i) =>
                  page === "ellipsis" ? (
                    <span
                      key={`ellipsis-${i}`}
                      className="px-2 text-sm text-gray-400"
                    >
                      …
                    </span>
                  ) : (
                    <button
                      key={page}
                      type="button"
                      onClick={() => table.setPageIndex(page - 1)}
                      className={`rounded-md border px-3 py-1.5 text-sm ${
                        pageIndex === page - 1
                          ? "border-indigo-600 bg-indigo-600 text-white"
                          : "border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  ),
              )}
              <button
                type="button"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
              <button
                type="button"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
                className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Last
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    {modal?.mode === "view" && (
      <Modal title="User details" onClose={closeModal}>
        <div className="flex items-center gap-3 pb-4">
          <span
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${getAvatarColor(
              modal.user.name,
            )}`}
          >
            {getInitials(modal.user.name)}
          </span>
          <div>
            <p className="font-medium text-gray-900">{modal.user.name}</p>
            <p className="text-sm text-gray-500">{modal.user.email}</p>
          </div>
        </div>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
          <div>
            <dt className="text-xs uppercase tracking-wide text-gray-400">Role</dt>
            <dd className="mt-0.5 text-gray-800">{modal.user.role}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-gray-400">Department</dt>
            <dd className="mt-0.5 text-gray-800">{modal.user.department}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-gray-400">Score</dt>
            <dd className="mt-0.5 font-semibold text-gray-800">{modal.user.score}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-gray-400">Status</dt>
            <dd className="mt-0.5 capitalize text-gray-800">{modal.user.status}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-gray-400">Joined</dt>
            <dd className="mt-0.5 text-gray-800">
              {new Date(modal.user.joinDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </dd>
          </div>
        </dl>
      </Modal>
    )}

    {modal?.mode === "edit" && editForm && (
      <Modal
        title="Edit user"
        onClose={closeModal}
        footer={
          <>
            <button
              type="button"
              onClick={closeModal}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveEdit}
              className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Save changes
            </button>
          </>
        }
      >
        <div className="space-y-3">
          <div>
            <label className={LABEL_CLASS}>Name</label>
            <input
              className={FIELD_CLASS}
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            />
          </div>
          <div>
            <label className={LABEL_CLASS}>Email</label>
            <input
              type="email"
              className={FIELD_CLASS}
              value={editForm.email}
              onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={LABEL_CLASS}>Role</label>
              <input
                className={FIELD_CLASS}
                value={editForm.role}
                onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
              />
            </div>
            <div>
              <label className={LABEL_CLASS}>Department</label>
              <input
                className={FIELD_CLASS}
                value={editForm.department}
                onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={LABEL_CLASS}>Score</label>
              <input
                type="number"
                min={0}
                max={100}
                className={FIELD_CLASS}
                value={editForm.score}
                onChange={(e) =>
                  setEditForm({ ...editForm, score: Number(e.target.value) })
                }
              />
            </div>
            <div>
              <label className={LABEL_CLASS}>Status</label>
              <select
                className={FIELD_CLASS}
                value={editForm.status}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    status: e.target.value as User["status"],
                  })
                }
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div>
            <label className={LABEL_CLASS}>Joined</label>
            <input
              type="date"
              className={FIELD_CLASS}
              value={editForm.joinDate}
              onChange={(e) => setEditForm({ ...editForm, joinDate: e.target.value })}
            />
          </div>
        </div>
      </Modal>
    )}

    {modal?.mode === "delete" && (
      <Modal
        title="Delete user"
        onClose={closeModal}
        footer={
          <>
            <button
              type="button"
              onClick={closeModal}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmDelete}
              className="rounded-lg bg-rose-600 px-3 py-2 text-sm font-medium text-white hover:bg-rose-700"
            >
              Delete
            </button>
          </>
        }
      >
        <div className="flex gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-600">
            <TriangleAlert size={18} />
          </span>
          <p className="text-sm text-gray-600">
            Are you sure you want to delete{" "}
            <span className="font-medium text-gray-900">{modal.user.name}</span>? This
            action cannot be undone.
          </p>
        </div>
      </Modal>
    )}
    </>
  );
};

export default UsersTablePage;

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
