import { useEffect, useState } from "react";
import { fetchImages } from "./api";

function Header() {
  return (
    <header className="hero is-warning is-bold">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">Amiibo Images</h1>
          <h2>5421040 藤本 悠作</h2>
          <h3>日本大学文理学部情報科学科Webプログラミングの演習課題</h3>
        </div>
      </div>
    </header>
  );
}

function Image(props) {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image">
          <img src = {props.src} alt = "Yoshi" />
        </figure>
      </div>
    </div>
  );
}

function Loading() {
  return <p>Loading...</p>;
}

function Gallery(props) {
  const { urls } = props;
  if(urls == null) {
    return <Loading />;
  }
  return (
    <div className="columns is-vcentered is-multiline">
      {urls.map((url) => {
        return (
          <div key = {url.image} className="column is-3">
            <Image src = {url.image} />
          </div>
        );
      })}
    </div>
  );
}

function Form(props) {
  function handleSubmit(event) {
    event.preventDefault();
    const { character } = event.target.elements;
    props.onFormSubmit(character.value);
  }
  return (
    <div>
      <form onSubmit = {handleSubmit}>
        <div className="field has-addons">
          <div className="control is-expanded">
            <div className="select is-fullwidth">
              <select name="character" defaultValue="Yoshi">
                <option value="Yoshi">Yoshi</option>
                <option value="Zelda">Zelda</option>
                <option value="Mario">Mario</option>
                <option value="Luigi">Luigi</option>
                <option value="Kirby">Kirby</option>
                <option value="Lucina">Lucina</option>
                <option value="Greninja">Greninja</option>
              </select>
            </div>
          </div>
          <div className="control">
            <button type="submit" className="button is-rounded">
              Reload
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
 
function Main() {
  const [urls, setUrls] = useState(null);
  useEffect(() => {
    fetchImages("Yoshi").then((urls) => {
      setUrls(urls);
    });
  }, []);
  function reloadImages(character) {
    fetchImages(character).then((urls) => {
      setUrls(urls);
    });
  }
  return (
    <main>
      <section className = "section">
        <div className = "container">
          <Form onFormSubmit = {reloadImages} />
          </div>
      </section>
      <section className="section">
        <div className="container">
          <Gallery urls = {urls} />
        </div>
      </section>
    </main>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>Amiibo images are retrieved from Amiibo API</p>
        <p>
          <a href="https://www.amiiboapi.com/docs/">Donate to Amiibo API</a>
        </p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;