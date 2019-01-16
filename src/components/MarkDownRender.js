import marked from 'marked';
export default props => (
  <div
    {...props}
    dangerouslySetInnerHTML={{ __html: marked(props.content ? props.content : '') }}
  />
);
