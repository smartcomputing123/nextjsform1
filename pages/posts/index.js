import Link from 'next/link';

export async function getStaticProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();
  return { props: { posts } };
}

export default function Posts({ posts }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">All Posts</h2>
      <ul className="space-y-2">
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`} className="hover:text-blue-600">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
