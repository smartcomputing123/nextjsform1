import Link from "next/link";

export async function getStaticProps() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5",
  );
  const posts = await res.json();
  console.log(posts);
  return { props: { posts } };
}

export default function Home({ posts }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Recent Posts</h2>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border-b pb-4">
            <Link href={`/posts/${post.id}`}>
              <h3 className="text-lg font-semibold hover:text-blue-600">
                {post.title}
              </h3>
            </Link>
            <p className="text-gray-600">{post.body.substring(0, 100)}...</p>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Link 
          href="/create-post"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create New Post
        </Link>
      </div>
      
    </div>
  );
}
