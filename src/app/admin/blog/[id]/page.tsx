import * as React from 'react';
import { notFound } from 'next/navigation';
import { BlogEditor } from '@/components/admin/blog-editor';
import { getActiveServerClient } from '@/lib/supabase/server';
import type { BlogPostRow } from '@/lib/supabase/types';

export const dynamic = 'force-dynamic';

async function fetchBlogPost(id: string): Promise<BlogPostRow | null> {
  const client = getActiveServerClient();
  if (!client) return null;

  try {
    const { data } = await client
      .from('blog_posts')
      .select('*')
      .or(`id.eq.${id},slug.eq.${id}`)
      .single();

    return data as BlogPostRow | null;
  } catch {
    return null;
  }
}

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await fetchBlogPost(id);

  if (!post) {
    notFound();
  }

  return <BlogEditor initialPost={post} isNew={false} />;
}
