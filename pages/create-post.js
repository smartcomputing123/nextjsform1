import PostForm from '../components/PostForm';

const CreatePostPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
      <p className="mb-6">
        This form submits to JSONPlaceholder (typicode) mock API server.
        Try both submission methods to see the difference.
      </p>
      <PostForm />

      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h2 className="text-xl font-semibold mb-2">About JSONPlaceholder</h2>
        <p className="mb-2">
          JSONPlaceholder is a free online REST API that you can use for testing and prototyping.
        </p>
        <p>
          Note: While the API will return a success response, it doesn't actually save the data.
        </p>
      </div>
    </div>
  );
};

export default CreatePostPage;