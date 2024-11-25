import UsersTable from "@/components/admin/users-table";

export default function AdminUsers() {
  return (
  <main  className="container h-dvh mx-auto py-8 px-4 sm:px-6 lg:px-8">
    {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> */}
    <UsersTable/>
  </main>
  );
}