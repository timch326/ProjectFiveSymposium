import registerUnbound from 'discourse/helpers/register-unbound';

registerUnbound('UserRoleI18n', function(string, options) {
  const hash = options.hash;
  var key = string + options.role;
  return I18n.t(key);
});