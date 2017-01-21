'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function ListItem(props) {
	// Correct! There is no need to specify the key here:
	return React.createElement(
		'li',
		null,
		props.value
	);
}

function NumberList(props) {
	var users = props.users;
	return React.createElement(
		'ul',
		null,
		users.map(function (user) {
			return React.createElement(ListItem, { key: user.username,
				value: user.username });
		})
	);
}

var App = function (_React$Component) {
	_inherits(App, _React$Component);

	function App() {
		_classCallCheck(this, App);

		var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

		_this.state = {
			users: []
		};
		return _this;
	}

	_createClass(App, [{
		key: 'setUsers',
		value: function setUsers(response) {
			this.setState({ users: response.data });
			console.log(this.state);
		}
	}, {
		key: 'componentWillMount',
		value: function componentWillMount() {
			var //recent = {},
			//alltime = {},
			app = this;

			//strangly, the recent and alltime URLS return the same users, just ordered differently.
			//So we only need one call to get all the data
			axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent').then(function (response) {
				//recent = response;
				app.setUsers(response);

				/*
    axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')
    .then(function (response) {
    	alltime = response;
    	app.setUsers(recent,alltime);
    		});
    */
			});
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				{ id: 'App' },
				React.createElement(NumberList, { users: this.state.users })
			);
		}
	}]);

	return App;
}(React.Component);

// ========================================

ReactDOM.render(React.createElement(App, null), document.getElementById('container'));