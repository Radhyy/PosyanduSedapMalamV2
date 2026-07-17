"use client";

import { useState } from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

interface KunjunganData {
  idBalita: string;
  namaBalita: string;
  statusGizi: string;
  imunisasi: string;
  tanggal: Date;
}

interface ExportExcelButtonProps {
  data: KunjunganData[];
  namaBulan: string;
}

export default function ExportExcelButton({ data, namaBulan }: ExportExcelButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const workbook = new ExcelJS.Workbook();
      workbook.creator = "Posyandu Sedap Malam";
      workbook.created = new Date();

      const sheet = workbook.addWorksheet("Laporan Kunjungan");

      // Title
      sheet.mergeCells("A1:E1");
      const titleCell = sheet.getCell("A1");
      titleCell.value = `Laporan Kunjungan Posyandu - ${namaBulan}`;
      titleCell.font = { name: "Arial", size: 16, bold: true, color: { argb: "FFFFFFFF" } };
      titleCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF2563EB" }, // Blue-600
      };
      titleCell.alignment = { vertical: "middle", horizontal: "center" };

      // Empty row
      sheet.addRow([]);

      // Headers
      const headerRow = sheet.addRow(["No", "Nama Balita", "Status Gizi", "Imunisasi Terakhir", "Tanggal Kunjungan"]);
      headerRow.height = 25;
      
      headerRow.eachCell((cell, colNumber) => {
        cell.font = { name: "Arial", size: 11, bold: true, color: { argb: "FFFFFFFF" } };
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FF1E293B" }, // Slate-800
        };
        cell.alignment = { vertical: "middle", horizontal: "center" };
        cell.border = {
          top: { style: "thin", color: { argb: "FFCBD5E1" } },
          left: { style: "thin", color: { argb: "FFCBD5E1" } },
          bottom: { style: "thin", color: { argb: "FFCBD5E1" } },
          right: { style: "thin", color: { argb: "FFCBD5E1" } },
        };
      });

      // Data Rows
      if (data.length === 0) {
        sheet.mergeCells("A4:E4");
        const emptyCell = sheet.getCell("A4");
        emptyCell.value = "Belum ada data kunjungan balita di bulan ini.";
        emptyCell.alignment = { vertical: "middle", horizontal: "center" };
      } else {
        data.forEach((item, index) => {
          const row = sheet.addRow([
            index + 1,
            item.namaBalita,
            item.statusGizi,
            item.imunisasi,
            new Date(item.tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
          ]);

          row.eachCell((cell, colNumber) => {
            cell.font = { name: "Arial", size: 11 };
            cell.alignment = { vertical: "middle", horizontal: colNumber === 1 ? "center" : "left" };
            cell.border = {
              top: { style: "thin", color: { argb: "FFE2E8F0" } },
              left: { style: "thin", color: { argb: "FFE2E8F0" } },
              bottom: { style: "thin", color: { argb: "FFE2E8F0" } },
              right: { style: "thin", color: { argb: "FFE2E8F0" } },
            };
          });

          // Coloring for Status Gizi
          const statusCell = row.getCell(3);
          statusCell.alignment = { vertical: "middle", horizontal: "center" };
          if (item.statusGizi === "Gizi Baik") {
            statusCell.font = { name: "Arial", size: 11, bold: true, color: { argb: "FF15803D" } }; // Green
            statusCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFDCFCE7" } };
          } else if (item.statusGizi === "Kurang") {
            statusCell.font = { name: "Arial", size: 11, bold: true, color: { argb: "FFA16207" } }; // Yellow
            statusCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFFEF08A" } };
          } else if (item.statusGizi === "Buruk") {
            statusCell.font = { name: "Arial", size: 11, bold: true, color: { argb: "FFB91C1C" } }; // Red
            statusCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFFEE2E2" } };
          } else {
            statusCell.font = { name: "Arial", size: 11, color: { argb: "FF64748B" } };
          }
        });
      }

      // Set column widths
      sheet.getColumn(1).width = 5;
      sheet.getColumn(2).width = 30;
      sheet.getColumn(3).width = 20;
      sheet.getColumn(4).width = 25;
      sheet.getColumn(5).width = 25;

      // Generate file
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      saveAs(blob, `Laporan_Posyandu_${namaBulan.replace(/\s+/g, '_')}.xlsx`);

    } catch (error) {
      console.error("Failed to export excel:", error);
      alert("Gagal mengekspor laporan. Silakan coba lagi.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button 
      onClick={handleExport}
      disabled={isExporting}
      className={`bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-bold transition-colors shadow-sm flex items-center gap-2 transform hover:-translate-y-0.5 ${isExporting ? 'opacity-75 cursor-not-allowed' : ''}`}
    >
      {isExporting ? (
        <><i className="fa-solid fa-spinner fa-spin"></i> Mengekspor...</>
      ) : (
        <><i className="fa-solid fa-file-excel"></i> Export Excel</>
      )}
    </button>
  );
}
