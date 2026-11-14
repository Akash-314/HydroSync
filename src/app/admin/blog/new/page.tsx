import * as React from 'react';
import { BlogEditor } from '@/components/admin/blog-editor';

export default function NewBlogPostPage() {
  return <BlogEditor isNew={true} />;
}

