import '../styles/style.css';
import PropTypes from 'prop-types';
import wrapper from '../store/configureStore';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(MyApp);
