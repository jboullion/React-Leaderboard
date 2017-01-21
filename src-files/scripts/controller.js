function ListItem(props) {
	return <li>{props.value}</li>;
}

function NumberList(props) {
	const users = props.users;
	return (
		<ul>
			{users.map((user) =>
				<ListItem key={user.username}
					value={user.username} />
				)}
		</ul>
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
			<div id="App">
				<NumberList users={this.state.users} />
			</div>
		);
	}
}

// ========================================

ReactDOM.render(
	<App />,
	document.getElementById('container')
);
