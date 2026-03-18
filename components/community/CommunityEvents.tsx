// src/components/community/CommunityEvents.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CAMEROON_REGIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  CalendarDays,
  MapPin,
  ExternalLink,
  Users,
  GraduationCap,
  Trophy,
  Banknote,
  Megaphone,
  Clock,
  Globe,
} from "lucide-react";
import { format, isAfter } from "date-fns";

const EVENT_CONFIG: Record<string, { label: string; icon: React.ComponentType<{ className?: string }>; color: string; bg: string }> = {
  workshop: { label: "Workshop", icon: Users, color: "text-blue-700", bg: "bg-blue-100" },
  training: { label: "Training", icon: GraduationCap, color: "text-green-700", bg: "bg-green-100" },
  meetup: { label: "Meetup", icon: Users, color: "text-purple-700", bg: "bg-purple-100" },
  funding: { label: "Funding", icon: Banknote, color: "text-gold-700", bg: "bg-gold-100" },
  competition: { label: "Competition", icon: Trophy, color: "text-orange-700", bg: "bg-orange-100" },
};

interface EventData {
  id: string;
  title: string;
  description: string;
  eventType: string;
  location: string | null;
  region: string | null;
  date: Date;
  endDate: Date | null;
  link: string | null;
  organizer: string | null;
  isActive: boolean;
}

interface Props {
  data: {
    localEvents: EventData[];
    otherEvents: EventData[];
    userRegion: string | null;
  } | EventData[];
}

export function CommunityEvents({ data }: Props) {
  const isGrouped = !Array.isArray(data);
  const localEvents = isGrouped ? (data as any).localEvents : [];
  const otherEvents = isGrouped ? (data as any).otherEvents : [];
  const userRegion = isGrouped ? (data as any).userRegion : null;
  const regionLabel = CAMEROON_REGIONS.find(
    (r) => r.value === userRegion
  )?.label;

  const allEmpty = localEvents.length === 0 && otherEvents.length === 0;

  if (allEmpty) {
    return (
      <Card className="border-2 border-dashed border-gray-200">
        <CardContent className="p-8 text-center">
          <CalendarDays className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="font-heading font-semibold text-gray-600">
            No upcoming events
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Check back soon for workshops, trainings, and opportunities!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Local / Relevant Events */}
      {localEvents.length > 0 && (
        <div>
          <h2 className="text-lg font-heading font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-green-600" />
            {regionLabel ? `Events near ${regionLabel.split(" ")[0]}` : "Relevant Events"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {localEvents.map((event: EventData) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}

      {/* Other Events */}
      {otherEvents.length > 0 && (
        <div>
          <h2 className="text-lg font-heading font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-600" />
            Other Events Across Cameroon
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {otherEvents.map((event: EventData) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function EventCard({ event }: { event: EventData }) {
  const config = EVENT_CONFIG[event.eventType] || EVENT_CONFIG.workshop;
  const Icon = config.icon;
  const regionLabel = CAMEROON_REGIONS.find(
    (r) => r.value === event.region
  )?.label;
  const isOngoing =
    event.endDate && isAfter(new Date(event.endDate), new Date());

  return (
    <Card className="border border-gray-100 card-hover">
      <CardContent className="p-5">
        {/* Type Badge */}
        <div className="flex items-center gap-2 mb-3">
          <Badge className={cn("text-xs", config.bg, config.color)}>
            <Icon className="w-3 h-3 mr-1" />
            {config.label}
          </Badge>
          {isOngoing && event.endDate && (
            <Badge className="text-[10px] bg-green-100 text-green-700">
              <Clock className="w-3 h-3 mr-0.5" />
              Ongoing
            </Badge>
          )}
        </div>

        {/* Title */}
        <h3 className="font-heading font-bold text-gray-900 line-clamp-2">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mt-2 line-clamp-3">
          {event.description}
        </p>

        {/* Meta */}
        <div className="space-y-1.5 mt-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <CalendarDays className="w-3.5 h-3.5 flex-shrink-0" />
            <span>
              {format(new Date(event.date), "dd MMM yyyy")}
              {event.endDate &&
                new Date(event.endDate).getTime() !==
                  new Date(event.date).getTime() &&
                ` — ${format(new Date(event.endDate), "dd MMM yyyy")}`}
            </span>
          </div>
          {event.location && (
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{event.location}</span>
              {regionLabel && (
                <Badge variant="outline" className="text-[10px] ml-1">
                  {regionLabel.split(" ")[0]}
                </Badge>
              )}
            </div>
          )}
          {event.organizer && (
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Megaphone className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{event.organizer}</span>
            </div>
          )}
        </div>

        {/* Link */}
        {event.link && (
          <a
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block"
          >
            <Button
              variant="outline"
              size="sm"
              className="w-full text-green-700 border-green-300 hover:bg-green-50"
            >
              <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
              Learn More / Register
            </Button>
          </a>
        )}
      </CardContent>
    </Card>
  );
}