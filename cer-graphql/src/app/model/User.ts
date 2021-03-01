
export class User {

  public firstName: string;
  public lastName: string;
  public displayName: string;
  public eppn: string;
  public mail: string;
  public uid: string;
  public initials: string;

  private static getAttrValue(attributes: any, key: string) {
    for (const attr of attributes) {
      if(attr['name'] === 'mail' && key === 'mail') {
        const knownEmailAddresses = attr['values'];
        return User.getPrimaryEmail(knownEmailAddresses);
      } else if (attr['name'] === key) {
        const values = attr['values'];
        if (values && values.length) {
          return values[0];
        }
      }
    }

    return '';
  }

  /*
   * If a user has multiple known email addresses, this function selects which to use as the 'primary'
   * email address. Priority is given to institutional email addresses (staff->student->generic instutional->any).
   */
  private static getPrimaryEmail(knownEmailAddresses: any[]): String  {
    const EMAIL_PRIORITIES = [
      '.*@auckland.ac.nz',
      '.*@aucklanduni.ac.nz',
      '.*ac.nz'
    ];

    for(let emailPriority of EMAIL_PRIORITIES) 
      for(let email of knownEmailAddresses) 
        if(email.search(emailPriority) != -1)  
          return email;

    return knownEmailAddresses[0]; // None of the user's email addresses are institutional ¯\_(ツ)_/¯
  }

  public static fromSession(session: any): User {
    const user = new User();
    const attributes = session['attributes'];
    user.displayName = User.getAttrValue(attributes, 'displayName');
    user.eppn = User.getAttrValue(attributes, 'eppn');
    user.mail = User.getAttrValue(attributes, 'mail');
    user.uid = User.getAttrValue(attributes, 'uid');
    user.firstName = User.getAttrValue(attributes, 'givenName');
    user.lastName = User.getAttrValue(attributes, 'sn');

    // Create Initials for user
    if (user.firstName.length > 0 && user.lastName.length > 0) {
      user.initials = (user.firstName[0] + user.lastName[0]).toUpperCase();
    } else {
      user.initials = 'Me';
    }

    return user;
  }
}
