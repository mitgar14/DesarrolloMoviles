import { Badge } from "@/components/ui/badge";
import { CAMPUS_LOCATIONS } from "@/data/campus";
import { errandStatusMeta, errandTypeMeta, formatCOP, relativeTime } from "@/lib/meta";
import type { Errand } from "@/types";
import { ArrowRight, Coins } from "lucide-react";
import { Link } from "react-router-dom";

export function ErrandCard({ errand }: { errand: Errand }) {
  const t = errandTypeMeta[errand.type];
  const st = errandStatusMeta[errand.status];
  const origin = CAMPUS_LOCATIONS.find((l) => l.id === errand.originId);
  const dest = CAMPUS_LOCATIONS.find((l) => l.id === errand.destinationId);

  return (
    <Link
      to={`/errands/${errand.id}`}
      className="block bg-card rounded-2xl border border-border/60 shadow-sm hover:shadow-md transition p-4"
    >
      <div className="flex items-start gap-3">
        <div className="h-11 w-11 rounded-xl bg-gradient-primary/10 grid place-items-center shrink-0 border border-primary/20">
          <t.icon className="h-5 w-5 text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <Badge variant="outline" className={st.className}>{st.label}</Badge>
            <span className="text-[11px] text-muted-foreground">{relativeTime(errand.createdAt)}</span>
          </div>
          <h3 className="font-display font-semibold text-sm truncate">{errand.title}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{errand.description}</p>
          <div className="flex items-center gap-2 mt-2 text-[11px] text-muted-foreground">
            <span className="px-2 py-0.5 rounded-full bg-muted">{origin?.name}</span>
            <ArrowRight className="h-3 w-3" />
            <span className="px-2 py-0.5 rounded-full bg-muted">{dest?.name}</span>
          </div>
        </div>
        {errand.reward ? (
          <div className="text-right shrink-0">
            <div className="flex items-center gap-1 text-primary font-semibold text-sm">
              <Coins className="h-3.5 w-3.5" />
              {formatCOP(errand.reward)}
            </div>
            <p className="text-[10px] text-muted-foreground">recompensa</p>
          </div>
        ) : null}
      </div>
    </Link>
  );
}
