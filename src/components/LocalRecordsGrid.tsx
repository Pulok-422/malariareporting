import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MONTH_COLUMNS, MONTH_LABELS, getDhakaMonth, getDhakaYear, getMonthTotal } from "@/lib/monthUtils";
import { RefreshCw, Save } from "lucide-react";

interface LocalRow {
  id: string;
  village_id: string;
  sk_user_id: string;
  reporting_year: number;
  hh: number;
  population: number;
  itn_2023: number;
  itn_2024: number;
  itn_2025: number;
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
  // joined
  district_name?: string;
  upazila_name?: string;
  union_name?: string;
  village_name?: string;
  ward_no?: string | null;
}

const LocalRecordsGrid = () => {
  const { user, role } = useAuth();
  const { toast } = useToast();
  const isAdmin = role === "admin";
  const currentMonth = getDhakaMonth();
  const currentYear = getDhakaYear();

  const [year, setYear] = useState(currentYear);
  const [rows, setRows] = useState<LocalRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dirtyIds, setDirtyIds] = useState<Set<string>>(new Set());

  const fetchData = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      let query = supabase
        .from("local_records")
        .select(`
          *,
          villages!inner (
            name,
            ward_no,
            unions!inner (
              name,
              upazilas!inner (
                name,
                districts!inner ( name )
              )
            )
          )
        `)
        .eq("reporting_year", year)
        .order("created_at");

      if (!isAdmin) {
        query = query.eq("sk_user_id", user.id);
      }

      const { data, error } = await query;
      if (error) throw error;

      const mapped = (data || []).map((r: any) => ({
        ...r,
        district_name: r.villages?.unions?.upazilas?.districts?.name ?? "",
        upazila_name: r.villages?.unions?.upazilas?.name ?? "",
        union_name: r.villages?.unions?.name ?? "",
        village_name: r.villages?.name ?? "",
        ward_no: r.villages?.ward_no ?? "",
      }));

      setRows(mapped);
      setDirtyIds(new Set());
    } catch (err: any) {
      toast({ title: "Load error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [user, year, isAdmin, toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCellChange = (rowId: string, field: string, value: string) => {
    const num = value === "" ? 0 : parseInt(value, 10);
    if (isNaN(num) || num < 0) return;
    setRows((prev) =>
      prev.map((r) => (r.id === rowId ? { ...r, [field]: num } : r))
    );
    setDirtyIds((prev) => new Set(prev).add(rowId));
  };

  const handleSave = async () => {
    if (dirtyIds.size === 0) return;
    setSaving(true);
    try {
      const dirty = rows.filter((r) => dirtyIds.has(r.id));
      for (const r of dirty) {
        const updatePayload: Record<string, number> = {
          hh: r.hh,
          population: r.population,
          itn_2023: r.itn_2023,
          itn_2024: r.itn_2024,
          itn_2025: r.itn_2025,
        };
        MONTH_COLUMNS.forEach((col) => {
          updatePayload[col] = (r as any)[col];
        });
        const { error } = await supabase
          .from("local_records")
          .update(updatePayload)
          .eq("id", r.id);
        if (error) throw error;
      }
      setDirtyIds(new Set());
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

  const isITNEditable = isAdmin;

  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

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
        <Button size="sm" onClick={handleSave} disabled={saving || dirtyIds.size === 0}>
          <Save className="h-4 w-4 mr-1" /> Save {dirtyIds.size > 0 && `(${dirtyIds.size})`}
        </Button>
      </div>

      <div className="border rounded-md overflow-auto max-h-[calc(100vh-220px)]">
        <table className="w-full text-xs border-collapse">
          <thead className="sticky top-0 z-10 bg-muted">
            <tr>
              <th className="grid-th min-w-[100px] sticky left-0 bg-muted z-20">District</th>
              <th className="grid-th min-w-[100px]">Upazila</th>
              <th className="grid-th min-w-[90px]">Union</th>
              <th className="grid-th min-w-[90px]">Village</th>
              <th className="grid-th min-w-[60px]">Ward</th>
              <th className="grid-th min-w-[60px]">H/H</th>
              <th className="grid-th min-w-[70px]">Pop.</th>
              <th className="grid-th min-w-[65px]">ITN'23</th>
              <th className="grid-th min-w-[65px]">ITN'24</th>
              <th className="grid-th min-w-[65px]">ITN'25</th>
              {MONTH_LABELS.map((m) => (
                <th key={m} className="grid-th min-w-[55px]">{m}</th>
              ))}
              <th className="grid-th min-w-[60px] font-bold">Total</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && !loading && (
              <tr>
                <td colSpan={23} className="text-center py-8 text-muted-foreground">
                  No records for {year}
                </td>
              </tr>
            )}
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-accent/30">
                <td className="grid-td sticky left-0 bg-background z-[5] font-medium">{row.district_name}</td>
                <td className="grid-td">{row.upazila_name}</td>
                <td className="grid-td">{row.union_name}</td>
                <td className="grid-td">{row.village_name}</td>
                <td className="grid-td">{row.ward_no || ""}</td>
                <td className="grid-td p-0">
                  <input
                    type="number"
                    min={0}
                    className="grid-input"
                    value={row.hh}
                    onChange={(e) => handleCellChange(row.id, "hh", e.target.value)}
                  />
                </td>
                <td className="grid-td p-0">
                  <input
                    type="number"
                    min={0}
                    className="grid-input"
                    value={row.population}
                    onChange={(e) => handleCellChange(row.id, "population", e.target.value)}
                  />
                </td>
                {(["itn_2023", "itn_2024", "itn_2025"] as const).map((itnCol) => (
                  <td key={itnCol} className="grid-td p-0">
                    <input
                      type="number"
                      min={0}
                      className="grid-input"
                      value={(row as any)[itnCol]}
                      onChange={(e) => handleCellChange(row.id, itnCol, e.target.value)}
                      disabled={!isITNEditable}
                    />
                  </td>
                ))}
                {MONTH_COLUMNS.map((col, idx) => (
                  <td key={col} className="grid-td p-0">
                    <input
                      type="number"
                      min={0}
                      className={`grid-input ${isMonthEditable(idx) ? "" : "bg-muted/50 text-muted-foreground"}`}
                      value={(row as any)[col]}
                      onChange={(e) => handleCellChange(row.id, col, e.target.value)}
                      disabled={!isMonthEditable(idx)}
                    />
                  </td>
                ))}
                <td className="grid-td font-bold text-center bg-muted/30">
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

export default LocalRecordsGrid;
