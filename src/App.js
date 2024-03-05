import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  useParams,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { Counter } from "./features/counter/Counter";
import { PostList } from "./features/posts/PostList";
import { AddPostForm } from "./features/posts/AddPostForm";
import { SinglePostPage } from "./features/posts/SinglePostPage";
import { EditPostForm } from "./features/posts/EditPostForm";

const BlogPosts = {
  "first-blog-post": {
    title: "First Blog Post",
    description: "Lorem ipsum dolor sit amet, consectetur adip.",
  },
  "second-blog-post": {
    title: "Second Blog Post",
    description: "Hello React Router v6",
  },
};

function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Home</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
    </div>
  );
}

function About() {
  return (
    <div style={{ padding: 20 }}>
      <h2>About view</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
    </div>
  );
}

function NoMatch() {
  return (
    <div style={{ padding: 20 }}>
      <h2>404 - Page not found</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
    </div>
  );
}

function Posts() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Blog</h2>
      <Outlet />
    </div>
  );
}

/* function PostLists() {
  return (
    <ul>
      {Object.entries(BlogPosts).map(([slug, { title }]) => (
        <li key={slug}>
          <Link to={`/posts/${slug}`}> {title} </Link>
        </li>
      ))}
    </ul>
  );
}
 */
function Post() {
  const { slug } = useParams();
  const post = BlogPosts[slug];

  if (!post) {
    return <span>The blog post you've requested doesn't exist.</span>;
  }

  const { title, description } = post;

  return (
    <div style={{ padding: 20 }}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

function Stats({ user }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Stats View</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
    </div>
  );
}

function Login({ onLogin }) {
  const [creds, setCreds] = useState({});
  const navigate = useNavigate();

  const handleLogin = () => {
    if (creds.userName === "Admin" && creds.password === "123") {
      onLogin && onLogin({ userName: "Admin" });
      navigate("/stats");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <br />
      <span>User name:</span>
      <input
        type="text"
        onChange={(e) => setCreds({ ...creds, userName: e.target.value })}
      />
      <span>Password:</span>
      <input
        type="password"
        onChange={(e) => setCreds({ ...creds, password: e.target.value })}
      />
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

function ApplyLayout() {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <>
      <nav style={{ padding: 10 }}>
        <Link to={"/"} style={{ padding: 5 }}>
          Home
        </Link>
        <Link to={"/posts"} style={{ padding: 5 }}>
          Posts
        </Link>
        <Link to={"/addpost"} style={{ padding: 5 }}>
          Add Post
        </Link>
        <Link style={{ padding: 5 }} to={"/about"}>
          About
        </Link>
        <span>|</span>
        {user && (
          <Link to={"/stats"} style={{ padding: 5 }}>
            Stats
          </Link>
        )}
        {!user && (
          <Link to={"/login"} style={{ padding: 5 }}>
            Login
          </Link>
        )}
        {user && (
          <span
            onClick={handleLogout}
            style={{ padding: 5, cursor: "pointer" }}
          >
            Logout
          </span>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Counter />} />
        <Route path="/about" element={<About />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/addpost" element={<AddPostForm />} />
        <Route path="/posts/:postId" element={<SinglePostPage />} />
        <Route path="/editpost/:postId" element={<EditPostForm />} />
        <Route path="*" element={<NoMatch />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/stats" element={<Stats user={user} />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <ApplyLayout />
    </Router>
  );
}

export default App;
