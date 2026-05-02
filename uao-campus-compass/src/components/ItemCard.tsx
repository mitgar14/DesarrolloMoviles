import { Badge } from "@/components/ui/badge";
import { CAMPUS_LOCATIONS } from "@/data/campus";
import { itemCategoryMeta, itemStatusMeta, relativeTime } from "@/lib/meta";
import type { LostFoundItem } from "@/types";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export function ItemCard({ item }: { item: LostFoundItem }) {
  const cat = itemCategoryMeta[item.category];
  const st = itemStatusMeta[item.status];
  const loc = CAMPUS_LOCATIONS.find((l) => l.id === item.locationId);

  return (
    <Link
      to={`/items/${item.id}`}
      className="group block bg-card rounded-2xl border border-border/60 shadow-sm hover:shadow-md transition overflow-hidden"
    >
      <div className="flex gap-3 p-3">
        <div className="h-20 w-20 rounded-xl bg-muted overflow-hidden shrink-0 relative">
          {item.photoUrl ? (
            <img src={item.photoUrl} alt={item.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition" />
          ) : (
            <div className="h-full w-full grid place-items-center text-muted-foreground">
              <cat.icon className="h-7 w-7" />
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className={st.className}>{st.label}</Badge>
            <span className="text-[11px] text-muted-foreground">{relativeTime(item.date)}</span>
          </div>
          <h3 className="font-display font-semibold text-sm truncate">{item.title}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{item.description}</p>
          <div className="flex items-center gap-3 mt-1.5 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1"><cat.icon className="h-3 w-3" />{cat.label}</span>
            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{loc?.name}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
