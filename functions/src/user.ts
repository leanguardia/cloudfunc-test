export class User {
    name: string;
    gender: string;
    birthdate: string;
    city: string;

    required_fields:string[] = [ 'name', 'gender', 'birthdate', 'city' ];

    constructor( data:object ) {
        
        if (this.required_fields_are_present(data)) {
            this.name = data['name'];
            this.gender = data['gender'];
            this.birthdate = data['birthdate'];
            this.city = data['city'];
        }
        else {
            throw new Error('Missing Fields');
        }
    }

    raise_error() {
        throw new Error('Missing Fields');
    }

    private required_fields_are_present(data):boolean {
        let field_candidates:string[] = Object.keys(data);
        for (let field of this.required_fields) {
            if (field_candidates.indexOf(field) === -1) {
                return false; 
            }
        }
        return true;
    }
}
