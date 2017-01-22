

function UserRow(props) {
	console.log(props);
	return <tr>
			<td>{props.index}</td>
			<td><a href={"https://www.freecodecamp.com/"+props.user.username} target="_blank">{props.user.username}</a></td>
			<td>{props.user.recent}</td>
			<td>{props.user.alltime}</td>
		</tr>;
}

function UserRows(props) {
	const users = props.users;
	return (
		<tbody>
			{users.map((user, index) =>
				<UserRow key={user.username}
					user={user}
					index={index} />
				)}
		</tbody>
	);
}

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			users: []
		}
	}

	setUsers(response){
		this.setState({users: response.data});
		console.log(this.state);
	}

	componentWillMount(){
		var app = this;

		//strangly, the recent and alltime URLS return the same users, just ordered differently.
		//So we only need one call to get all the data
		axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
		.then(function (response) {
			app.setUsers(response);
		});

	}

	render() {
		return (
			<table id="App">
				<thead>
					<tr>
						<th>#</th>
						<th>Camper Name</th>
						<th>Recent Points</th>
						<th>Alltime Points</th>
					</tr>
				</thead>
				<UserRows users={this.state.users} />
			</table>
		);
	}
}

// ========================================

ReactDOM.render(
	<App />,
	document.getElementById('container')
);
