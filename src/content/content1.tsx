import style from './content1.module.less';

export const config = {
  component: true,
  shadow: true,
}

const App = () => {
  return <div className={style.content}>这是一个渲染到最外层的shadowDom中的content</div>
}

export default App