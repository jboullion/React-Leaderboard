

function UserRow(props) {

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

function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function SortHeader(props) {
	const sortName = capitalize(props.sort);
	let classes = "sort-by";
	if(props.sort === props.sortBy){
		classes += " "+props.order;
	}
	return <th id={"sort-"+props.sort} className={classes} onClick={() => props.onClick(props.sort)}>{sortName} Points</th>;
}

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			users: [],
			sortBy: 'recent',
			order: 'asc'
		}
	}

	setUsers(response){
		//console.log(response.data);
		this.setState({users: response.data});
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

	handleClick(sort){
		const newOrder = 'asc'===this.state.order?'desc':'asc';
		let sortedUsers = []
		if(newOrder === 'asc'){
			if(sort === 'recent'){
				sortedUsers = this.state.users.sort(function(a,b){return b.recent - a.recent});
			}else{
				sortedUsers = this.state.users.sort(function(a,b){return b.alltime - a.alltime});
			}
		}else{
			if(sort === 'recent'){
				sortedUsers = this.state.users.sort(function(a,b){return a.recent - b.recent});
			}else{
				sortedUsers = this.state.users.sort(function(a,b){return a.alltime - b.alltime});
			}
		}

		this.setState({users: sortedUsers, sortBy: sort, order: newOrder});
	}

	render() {
		return (
			<table id="App">
				<thead>
					<tr>
						<th>#</th>
						<th>Camper Name</th>
						<SortHeader
							sort={'recent'}
							sortBy={this.state.sortBy}
							order={this.state.order}
							onClick={(sort) => this.handleClick(sort)} />
						<SortHeader
							sort={'all'}
							sortBy={this.state.sortBy}
							order={this.state.order}
							onClick={(sort) => this.handleClick(sort)} />
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
	document.getElementById('app')
);
