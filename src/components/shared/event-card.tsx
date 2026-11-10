import * as React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EventItem } from '@/types';

export interface EventCardProps {
  event: EventItem;
  onRegister?: () => void;
}

export function EventCard({ event, onRegister }: EventCardProps) {
  // Extract month and day if parsable, or display as string
  const parts = event.date.split(' ');
  const day = parts[0] || '15';
  const month = parts[1] || 'DEC';

  return (
    <Card hoverable className="p-5 sm:p-6">
      <CardContent className="p-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        {/* Date block */}
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-lg border border-theme-border bg-theme-bg text-center">
            <span className="text-xs font-semibold uppercase text-brand-secondary tracking-wider">
              {month}
            </span>
            <span className="text-xl font-extrabold font-heading text-theme-heading leading-none">
              {day}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="neutral">{event.type}</Badge>
              {event.seatsAvailable !== undefined && event.seatsAvailable <= 15 && (
                <Badge variant="warning">
                  {event.seatsAvailable} Seats Left
                </Badge>
              )}
            </div>
            <h3 className="text-base sm:text-lg font-bold font-heading text-theme-heading">
              {event.title}
            </h3>
            <div className="flex flex-wrap items-center gap-4 mt-1.5 text-xs text-theme-muted">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-brand-secondary" />
                {event.location} ({event.mode})
              </span>
              {event.time && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {event.time}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="w-full sm:w-auto shrink-0">
          <Button
            variant="primary"
            size="sm"
            href={`/apply?event=${encodeURIComponent(event.title)}`}
            onClick={onRegister}
            className="w-full sm:w-auto"
          >
            Register Seat
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

