import { authService } from '../services/auth.service'
import { User } from '../models/user.model'

class UserService {

    private readonly urlUser = 'http://192.168.0.186:3030/users'
    private readonly urlRoles = 'http://192.168.0.186:3030/roles'

    private async getHeaders() {
        const sessionUser = await authService.getSessionUser()
        if (!sessionUser) throw new Error('User need to sign in')

        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionUser.token}`,
        }
    }

    private async getData(response: Response) {
        if (response.status >= 200 && response.status < 300) {
            return await response.json()
        
        } else if (response.status === 400) {
            throw new Error('User already exists', { cause: response.status })
        }
        
        throw new Error('Session expired')
    }

    public async getList() {
        const response = await fetch(this.urlUser, {
            method: 'GET',
            headers: await this.getHeaders()
        })
        return await this.getData(response) as User[]
    }

    public async create(user: User) {
        const response = await fetch(this.urlUser, {
            method: 'POST',
            headers: await this.getHeaders(),
            body: JSON.stringify(user)
        })
        return await this.getData(response) as User
    }

    public async update(user: User) {
        const response = await fetch(`${this.urlUser}/${user.id}`, {
            method: 'PUT',
            headers: await this.getHeaders(),
            body: JSON.stringify(user)
        })
        return await this.getData(response) as User
    }

    public async delete(id: number) {
        const response = await fetch(`${this.urlUser}/${id}`, {
            method: 'DELETE',
            headers: await this.getHeaders(),
        })
        return await this.getData(response) as boolean
    }


    public async getRoles() {
        const response = await fetch(this.urlRoles, {
          method: 'GET',
          headers: await this.getHeaders(),
        });
        return await this.getData(response);
    }

    public async createRole(role: { name: string }) {
        const response = await fetch(this.urlRoles, {
          method: 'POST',
          headers: await this.getHeaders(),
          body: JSON.stringify(role),
        });
        return await this.getData(response);
    }

}

export const userService = new UserService()