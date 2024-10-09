
const MessageContainer = ({ messages }) => {
    return <div>
        {messages.map((msg, index) => (
          <table key={index} striped="true" bordered="true">
            <tbody>
              <tr>
                <td>{msg.msg}  -  {msg.username}</td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>
    
  };

export default MessageContainer;