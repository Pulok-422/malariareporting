import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getDhakaYear, MONTH_LABELS, MONTH_COLUMNS } from "@/lib/monthUtils";
import { Check, RefreshCw } from "lucide-react";

type RecordType = "local" | "non_local";

interface ReviewRow {
  id: string;
  record_type: RecordType;
  sk_user_id: string;
  sk_name: string;
  location: string;
  reporting_year: number;
  [key: string]: any;
}

interface ApprovalRow {
  record_id: string;
  month: number;
  status: "PENDING" | "APPROVED";
}

const AdminRecordReview = () => {
  const { user } = useAuth();
  const currentYear = getDhakaYear();

  const [year, setYear] = useState(currentYear);
  const [recordType, setRecordType] = useState<RecordType>("local");
  const [rows, setRows] = useState<ReviewRow[]>([]);
  const [approvals, setApprovals] = useState<ApprovalRow[]>([]);
  const [loading, setLoading] = useState(false);

  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      // 1️⃣ Fetch records
      const { data: recordData, error: recordError } = await supabase
        .from(recordType === "local" ? "local_records" : "non_local_records")
        .select("*")
        .eq("reporting_year", year);

      if (recordError) throw recordError;

      // 2️⃣ Fetch approvals
      const { data: approvalData, error: approvalError } = await supabase
        .from("monthly_approvals")
        .select("record_id, month, status")
        .eq("record_type", recordType)
        .eq("reporting_year", year);

      if (approvalError) throw approvalError;

      const mapped =
        recordData?.map((r: any) => ({
          ...r,
          record_type: recordType,
          sk_name: r.sk_user_id, // replace later with join if needed
          location:
            recordType === "local"
              ? r.village_id
              : `${r.country} - ${r.village_name}`,
        })) || [];

      setRows(mapped);
      setApprovals(approvalData || []);
    } catch (err) {
      console.error("Admin load error:", err);
    } finally {
      setLoading(false);
    }
  }, [recordType, year]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getStatus = (recordId: string, month: number) => {
    const found = approvals.find(
      (a) => a.record_id === recordId && a.month === month,
    );
    return found?.status;
  };

  const approveMonth = async (recordId: string, month: number) => {
    if (!user) return;

    await supabase.from("monthly_approvals").upsert({
      record_type: recordType,
      record_id: recordId,
      reporting_year: year,
      month,
      status: "APPROVED",
      approved_by: user.id,
      approved_at: new Date(),
    });

    fetchData();
  };

  const approveAllRow = async (recordId: string) => {
    if (!user) return;

    for (let m = 1; m <= 12; m++) {
      await supabase.from("monthly_approvals").upsert({
        record_type: recordType,
        record_id: recordId,
        reporting_year: year,
        month: m,
        status: "APPROVED",
        approved_by: user.id,
        approved_at: new Date(),
      });
    }

    fetchData();
  };

  const getCellColor = (recordId: string, month: number) => {
    const status = getStatus(recordId, month);
    if (status === "APPROVED") return "bg-green-100 text-green-700";
    if (status === "PENDING") return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Select value={String(year)} onValueChange={(v) => setYear(Number(v))}>
            <SelectTrigger className="w-[120px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {years.map((y) => (
                <SelectItem key={y} value={String(y)}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex border rounded-md overflow-hidden">
            <button
              onClick={() => setRecordType("local")}
              className={`px-3 h-8 text-xs ${
                recordType === "local"
                  ? "bg-gray-900 text-white"
                  : "bg-white"
              }`}
            >
              Local
            </button>
            <button
              onClick={() => setRecordType("non_local")}
              className={`px-3 h-8 text-xs ${
                recordType === "non_local"
                  ? "bg-gray-900 text-white"
                  : "bg-white"
              }`}
            >
              Non-Local
            </button>
          </div>
        </div>

        <Button variant="outline" size="sm" onClick={fetchData}>
          <RefreshCw className="h-4 w-4 mr-2" /> Reload
        </Button>
      </div>

      {/* Table */}
      <div className="border rounded-md overflow-auto">
        <table className="w-full text-xs border-collapse">
          <thead className="bg-muted sticky top-0">
            <tr>
              <th className="p-2 text-left">SK</th>
              <th className="p-2 text-left">Location</th>
              {MONTH_LABELS.map((m) => (
                <th key={m} className="p-2 text-center">
                  {m}
                </th>
              ))}
              <th className="p-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t">
                <td className="p-2">{row.sk_name}</td>
                <td className="p-2">{row.location}</td>

                {MONTH_COLUMNS.map((col, idx) => {
                  const month = idx + 1;
                  return (
                    <td key={col} className="p-1 text-center">
                      <button
                        onClick={() => approveMonth(row.id, month)}
                        className={`px-2 py-1 rounded text-xs ${getCellColor(
                          row.id,
                          month,
                        )}`}
                      >
                        {getStatus(row.id, month) || "—"}
                      </button>
                    </td>
                  );
                })}

                <td className="p-2 text-center">
                  <Button
                    size="sm"
                    onClick={() => approveAllRow(row.id)}
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Approve All
                  </Button>
                </td>
              </tr>
            ))}

            {rows.length === 0 && !loading && (
              <tr>
                <td colSpan={15} className="text-center p-6 text-muted-foreground">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRecordReview;
