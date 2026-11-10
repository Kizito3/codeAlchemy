import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { createPost } from "@/functions/posts";
import PageHeader from "#/components/dashboard/page-header";
import PostForm from "#/components/dashboard/post-form";

export const Route = createFileRoute("/dashboard/posts/new")({
  component: NewPost,
});

function NewPost() {
  const navigate = useNavigate();
  const create = useServerFn(createPost);

  return (
    <>
      <PageHeader title="New post" description="Write it, preview it, then publish when it's ready." />
      <div className="mt-8">
        <PostForm
          submitLabel="Create post"
          onSubmit={async (values) => {
            const res = await create({ data: values });
            if (!res.ok) return res;
            await navigate({ to: "/dashboard/posts" });
            return { ok: true };
          }}
        />
      </div>
    </>
  );
}