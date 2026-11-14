import * as React from 'react';
import { EventEditor } from '@/components/admin/event-editor';

export default function NewEventPage() {
  return <EventEditor isNew={true} />;
}

