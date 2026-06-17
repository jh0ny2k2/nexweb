export default function Ornament({ color = '#C4956A' }) {
  return (
    <svg viewBox="0 0 160 16" className="h-4 mx-auto" style={{ width: '140px' }}>
      <path d="M0,8 L55,8" stroke={color} strokeWidth="0.5" opacity="0.4" />
      <circle cx="60" cy="8" r="2.5" fill="none" stroke={color} strokeWidth="0.6" opacity="0.7" />
      <path d="M66,3 Q70,0 74,3 Q78,6 74,9 Q70,12 66,9 Q62,6 66,3" fill="none" stroke={color} strokeWidth="0.7" opacity="0.6" />
      <circle cx="80" cy="8" r="3" fill="none" stroke={color} strokeWidth="0.6" opacity="0.3" />
      <path d="M86,3 Q90,0 94,3 Q98,6 94,9 Q90,12 86,9 Q82,6 86,3" fill="none" stroke={color} strokeWidth="0.7" opacity="0.6" />
      <circle cx="100" cy="8" r="2.5" fill="none" stroke={color} strokeWidth="0.6" opacity="0.7" />
      <path d="M105,8 L160,8" stroke={color} strokeWidth="0.5" opacity="0.4" />
    </svg>
  )
}
