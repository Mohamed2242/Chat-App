using Backend.DataService;
using Backend.Models;
using Microsoft.AspNetCore.SignalR;

namespace Backend.Hubs
{
	public class ChatHub : Hub
	{
		//private readonly SharedDb _connection;

		//public ChatHub(SharedDb shared)
		//{
		//	_connection = shared;
		//}

		private readonly IDictionary<string, UserConnection> _connection;

		public ChatHub(IDictionary<string, UserConnection> connection)
		{
			_connection = connection;
		}

		public async Task JoinChat(UserConnection conn)
		{
			await Clients.All.SendAsync("ReceiveMessage", "admin", $"{conn.Username} has joined");
		}

		public async Task JoinSpecificChatRoom(UserConnection conn)
		{
			await Groups.AddToGroupAsync(Context.ConnectionId, conn.ChatRoom);

			_connection[Context.ConnectionId] = conn;

			await Clients.Group(conn.ChatRoom)
				.SendAsync("JoinSpecificChatRoom", "admin", $"{conn.Username} has joined {conn.ChatRoom} Room");
			
		}

		public async Task SendMessage(string msg)
		{
			if (_connection.TryGetValue(Context.ConnectionId, out UserConnection conn))
			{
				await Clients.Group(conn.ChatRoom).SendAsync("ReceiveSpecificMessage", conn.Username, msg);
			}
		}

		public override Task OnDisconnectedAsync(Exception? exp)
		{
			if (!_connection.TryGetValue(Context.ConnectionId, out UserConnection conn))
			{
				return base.OnDisconnectedAsync(exp);
			}

			_connection.Remove(Context.ConnectionId);
			Clients.Group(conn.ChatRoom!)
				.SendAsync("ReceiveLeaveMessage", "admin", $"{conn.Username} has left the Room");

			return base.OnDisconnectedAsync(exp);
		}

		//public Task SendConnectedUser(string room)
		//{
		//	var users = _connection.Values
		//		.Where(u => u.ChatRoom == room)
		//		.Select(s => s.Username);
		//	return Clients.Group(room).SendAsync("ConnectedUser", users);
		//}

	}
}
