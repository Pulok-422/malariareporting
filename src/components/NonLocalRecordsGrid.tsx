import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MONTH_COLUMNS,
  MONTH_LABELS,
  getDhakaMonth,
  getDhakaYear,
  getMonthTotal,
} from "@/lib/monthUtils";
import { Plus, Trash2, RefreshCw, Save } from "lucide-react";

interface NonLocalRow {
  id: string;
  sk_user_id: string;
  reporting_year: number;
  country: string;
  district_or_state: string;
  upazila_or_township: string;
  union_name: string;
  village_name: string;
  jan_cases: number;
  feb_cases: number;
  mar_cases: number;
  apr_cases: number;
  may_cases: number;
  jun_cases: number;
  jul_cases: number;
  aug_cases: number;
  sep_cases: number;
  oct_cases: number;
  nov_cases: number;
  dec_cases: number;
  _isNew?: boolean;
}

type CellStatus = "RED" | "YELLOW" | "GREEN";

const COUNTRIES = ["Bangladesh", "India", "Myanmar"];

const NonLocalRecordsGrid = () => {
  const { user, role } = useAuth();
  const { toast } = useToast();
  const isAdmin = role === "admin";
  const currentMonth = getDhakaMonth();
  const currentYear = getDhakaYear();

  const [year, setYear] = useState(currentYear);
  const [rows, setRows] = useState<NonLocalRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dirtyIds, setDirtyIds] = useState<Set<string>>(new Set());
  const [deletedIds, setDeletedIds] = useState<string[]>([]);

  // -------- Color Logic (No DB Change) --------
  const getMonthStatus = (value: number, monthIndex: number): CellStatus => {
    if (!value || value === 0) return "RED";
    const monthNumber = monthIndex + 1;

    if (!isAdmin && year === currentYear && monthNumber === currentMonth) {
      return "YELLOW";
    }
    return "GREEN";
  };

  const getMonthBg = (status: CellStatus) => {
    switch (status) {
      case "GREEN":
        return "bg-green-50 border-green-200";
      case "YELLOW":
        return "bg-yellow-50 border-yellow-200";
      default:
        return "bg-red-50 border-red-200";
    }
  };

  const fetchData = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      let query = supabase
        .from("non_local_records")
        .select("*")
        .eq("reporting_year", year)
        .order("created_at");

      if (!isAdmin) {
        query = query.eq("sk_user_id", user.id);
      }

      const { data, error } = await query;
      if (error) throw error;

      setRows(data || []);
      setDirtyIds(new Set());
      setDeletedIds([]);
    } catch (err: any) {
      toast({ title: "Load error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [user, year, isAdmin, toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addRow = () => {
    if (!user) return;
    const newRow: NonLocalRow = {
      id: crypto.randomUUID(),
      sk_user_id: user.id,
      reporting_year: year,
      country: "Bangladesh",
      district_or_state: "",
      upazila_or_township: "",
      union_name: "",
      village_name: "",
      jan_cases: 0,
      feb_cases: 0,
      mar_cases: 0,
      apr_cases: 0,
      may_cases: 0,
      jun_cases: 0,
      jul_cases: 0,
      aug_cases: 0,
      sep_cases: 0,
      oct_cases: 0,
      nov_cases: 0,
      dec_cases: 0,
      _isNew: true,
    };

    setRows((prev) => [...prev, newRow]);
    setDirtyIds((prev) => new Set(prev).add(newRow.id));
  };

  const deleteRow = (id: string) => {
    const row = rows.find((r) => r.id === id);
    if (!row) return;

    if (!row._isNew) {
      setDeletedIds((prev) => [...prev, id]);
    }

    setRows((prev) => prev.filter((r) => r.id !== id));
    setDirtyIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const handleCellChange = (rowId: string, field: string, value: string) => {
    if (MONTH_COLUMNS.includes(field as any)) {
      const num = value === "" ? 0 : parseInt(value, 10);
      if (isNaN(num) || num < 0) return;

      setRows((prev) =>
        prev.map((r) => (r.id === rowId ? { ...r, [field]: num } : r)),
      );
    } else {
      setRows((prev) =>
        prev.map((r) => (r.id === rowId ? { ...r, [field]: value } : r)),
      );
    }

    setDirtyIds((prev) => new Set(prev).add(rowId));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Delete removed
      for (const id of deletedIds) {
        const { error } = await supabase.from("non_local_records").delete().eq("id", id);
        if (error) throw error;
      }

      const dirty = rows.filter((r) => dirtyIds.has(r.id));

      for (const r of dirty) {
        const payload: any = {
          sk_user_id: r.sk_user_id,
          reporting_year: r.reporting_year,
          country: r.country,
          district_or_state: r.district_or_state,
          upazila_or_township: r.upazila_or_township,
          union_name: r.union_name,
          village_name: r.village_name,
        };

        MONTH_COLUMNS.forEach((col) => {
          payload[col] = (r as any)[col];
        });

        if (r._isNew) {
          payload.id = r.id;
          const { error } = await supabase.from("non_local_records").insert(payload);
          if (error) throw error;
        } else {
          const { error } = await supabase.from("non_local_records").update(payload).eq("id", r.id);
          if (error) throw error;
        }
      }

      setDirtyIds(new Set());
      setDeletedIds([]);
      setRows((prev) => prev.map((r) => ({ ...r, _isNew: false })));

      toast({ title: "Saved successfully" });
    } catch (err: any) {
      toast({ title: "Save error", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const isMonthEditable = (monthIndex: number) => {
    if (isAdmin) return true;
    if (year !== currentYear) return false;
    return monthIndex + 1 === currentMonth;
  };

  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);
  const hasDirty = dirtyIds.size > 0 || deletedIds.length > 0;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 flex-wrap">
        <Select value={String(year)} onValueChange={(v) => setYear(Number(v))}>
          <SelectTrigger className="w-[120px]">
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

        <Button variant="outline" size="sm" onClick={fetchData} disabled={loading}>
          <RefreshCw className="h-4 w-4 mr-1" /> Reload
        </Button>

        <Button size="sm" onClick={handleSave} disabled={saving || !hasDirty}>
          <Save className="h-4 w-4 mr-1" /> Save
        </Button>

        <Button variant="outline" size="sm" onClick={addRow}>
          <Plus className="h-4 w-4 mr-1" /> Add Row
        </Button>
      </div>

      <div className="border rounded-md overflow-auto max-h-[calc(100vh-220px)] bg-white">
        <table className="w-full text-xs border-collapse">
          <thead className="sticky top-0 z-10 bg-gray-50 border-b">
            <tr>
              <th className="grid-th min-w-[40px]"></th>
              <th className="grid-th min-w-[100px]">Country</th>
              <th className="grid-th min-w-[110px]">District/State</th>
              <th className="grid-th min-w-[110px]">Upazila/Township</th>
              <th className="grid-th min-w-[90px]">Union</th>
              <th className="grid-th min-w-[90px]">Village</th>
              {MONTH_LABELS.map((m) => (
                <th key={m} className="grid-th min-w-[55px]">
                  {m}
                </th>
              ))}
              <th className="grid-th min-w-[60px] font-bold">Total</th>
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 && !loading && (
              <tr>
                <td colSpan={19} className="text-center py-8 text-muted-foreground">
                  No records for {year}
                </td>
              </tr>
            )}

            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="grid-td p-1 text-center">
                  <button
                    onClick={() => deleteRow(row.id)}
                    className="text-destructive hover:text-destructive/80 p-0.5"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </td>

                <td className="grid-td p-0">
                  <select
                    className="grid-input bg-transparent"
                    value={row.country}
                    onChange={(e) => handleCellChange(row.id, "country", e.target.value)}
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="grid-td p-0">
                  <input
                    className="grid-input"
                    value={row.district_or_state}
                    onChange={(e) => handleCellChange(row.id, "district_or_state", e.target.value)}
                  />
                </td>

                <td className="grid-td p-0">
                  <input
                    className="grid-input"
                    value={row.upazila_or_township}
                    onChange={(e) => handleCellChange(row.id, "upazila_or_township", e.target.value)}
                  />
                </td>

                <td className="grid-td p-0">
                  <input
                    className="grid-input"
                    value={row.union_name}
                    onChange={(e) => handleCellChange(row.id, "union_name", e.target.value)}
                  />
                </td>

                <td className="grid-td p-0">
                  <input
                    className="grid-input"
                    value={row.village_name}
                    onChange={(e) => handleCellChange(row.id, "village_name", e.target.value)}
                  />
                </td>

                {MONTH_COLUMNS.map((col, idx) => {
                  const value = (row as any)[col] as number;
                  const status = getMonthStatus(value, idx);
                  const editable = isMonthEditable(idx);

                  return (
                    <td
                      key={col}
                      className={`grid-td p-0 border ${getMonthBg(status)} ${
                        editable ? "" : "opacity-80"
                      }`}
                      title={
                        status === "GREEN"
                          ? "Approved"
                          : status === "YELLOW"
                          ? "Waiting for approval"
                          : "Not submitted"
                      }
                    >
                      <input
                        type="number"
                        min={0}
                        className={`grid-input bg-transparent ${
                          editable ? "" : "text-muted-foreground"
                        }`}
                        value={value}
                        onChange={(e) => handleCellChange(row.id, col, e.target.value)}
                        disabled={!editable}
                      />
                    </td>
                  );
                })}

                <td className="grid-td font-bold text-center bg-gray-50">
                  {getMonthTotal(row)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NonLocalRecordsGrid;
