import React from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import GreenButton from '../../../shared/ui/button'

interface UserExportProps {
  users: Record<string, any>[]; 
}

const UserExport: React.FC<UserExportProps> = ({ users }) => {
  const exportUsersToExcel = async () => {
    if (!users || users.length === 0) return;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Пользователи");

    const headers = Object.keys(users[0]);
    worksheet.addRow(headers);

    users.forEach(user => {
      const values = headers.map(header => user[header]);
      worksheet.addRow(values);
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(blob, `users.xlsx`);
  };

  return (
    <GreenButton value={'Экспортировать пользователя'} shirina={300} func={exportUsersToExcel} />
  );
};

export default UserExport;
