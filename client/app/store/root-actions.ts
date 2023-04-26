// так мы сделали поотму что у нас в разных файлах находяться action а не в однм slice
import * as authActions from './auth/auth.actions'

export const rootAction = {
  ...authActions
}
