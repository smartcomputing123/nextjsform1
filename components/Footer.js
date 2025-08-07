const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <p>© {new Date().getFullYear()} Next.js Blog - Data from JSONPlaceholder</p>
    </footer>
  );
};

export default Footer;