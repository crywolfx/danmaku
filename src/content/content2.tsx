import style from './content2.module.less';

export const config = {
  component: true,
  shadow: false,
  root: document.querySelector('body'),
};

const App = () => {
  return <div className={style.content}>这是一个渲染到body中的普通content</div>;
};

export default App;
