// src/pages/_app.js



function MyApp({ Component, pageProps }) {
  return (
    <div>
     
      <Component {...pageProps} /> {/* This is where the current page content will be rendered */}
    </div>
  );
}

export default MyApp;
