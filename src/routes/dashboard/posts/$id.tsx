import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { getPostById, updatePost } from "@/functions/posts";
import PageHeader from "#/components/dashboard/page-header";
import PostForm from "#/components/dashboard/post-form";

export const Route = createFileRoute("/dashboard/posts/$id")({
  loader: ({ params }) => getPostById({ data: Number(params.id) }),
  notFoundComponent: () => (
    <div className="py-20 text-center">
      <h1 className="text-4xl text-[#123D2B]">Post not found.</h1>
      <Link to="/dashboard/posts" className="mt-4 inline-block text-[#197044] underline">
        Back to posts
      </Link>
    </div>
  ),
  component: EditPost,
});

function EditPost() {
  const post = Route.useLoaderData();
  const navigate = useNavigate();
  const update = useServerFn(updatePost);

  return (
    <>
      <PageHeader title="Edit post" description={post.title} />
      <div className="mt-8">
        <PostForm
          key={post.id}
          initial={post}
          submitLabel="Save changes"
          onSubmit={async (values) => {
            const res = await update({ data: { id: post.id, values } });
            if (!res.ok) return res;
            await navigate({ to: "/dashboard/posts" });
            return { ok: true };
          }}
        />
      </div>
    </>
  );
}