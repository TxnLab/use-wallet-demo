import { getIPFSUrl } from '@/utils/accounts'
import type { NfdRecordThumbnail } from '@/types/nfd'

export const getAvatarURL = (nfd: NfdRecordThumbnail): string => {
  const url =
    nfd?.properties?.userDefined?.avatar || nfd?.properties?.verified?.avatar

  if (!url) {
    return `/img/nfd-image-placeholder.jpg`
  }

  return getIPFSUrl(url)
}
