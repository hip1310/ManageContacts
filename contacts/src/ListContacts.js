import React, {Component} from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import {Link} from 'react-router-dom'

class ListContacts extends Component{
	static propTypes = {
		contacts: PropTypes.array.isRequired,
		onDeleteContact: PropTypes.func.isRequired
	}

	state = {
		query: ''
	}

	updateQuery = (query) => {
		this.setState({query: query.trim()})
	}

	resetQuery = () => {
		this.setState({query: ''})
	}

	render(){
		const {contacts, onDeleteContact} = this.props
		const {query} = this.state
		let contactsDisplayed

		if(query){
			const expression = new RegExp(escapeRegExp(query), 'i')
			contactsDisplayed = contacts.filter((c) => expression.test(c.name))
		} else {
			contactsDisplayed = contacts
		}

		contactsDisplayed.sort(sortBy('name'))

		return(
			<div className='list-contacts'>
				<div className='list-contacts-top'>
					<input 
						type='text'
					    className='search-contacts'
					    value={query}
					    placeholder='Search Contacts'
					    onChange={(event) => this.updateQuery(event.target.value)}
					/>

					<Link to='/create' className='add-contact'>
						Add Contact
					</Link>
				</div>

				{contactsDisplayed.length !== contacts.length && (
					<div className='showing-contacts'>
						<span>Showing {contactsDisplayed.length} of {contacts.length} contacts.</span>
						<button onClick={this.resetQuery}>Show All</button>
					</div>
				)}

				<ol className='contact-list'>
					{contactsDisplayed.map(contact => 
						<li key={contact.id} className='contact-list-item'>
							<div className='contact-avatar' style={{
								backgroundImage: `url(${contact.avatarURL})`
							}}/>

							<div className='contact-details'>
								<p>{contact.name}</p>
								<p>{contact.email}</p>
							</div>

							<button 
							  onClick={() => onDeleteContact(contact)}
							  className='contact-remove'>
							  Remove
							</button>
						</li>
					)}
				</ol>
			</div>
		)
	}
}

export default ListContacts
