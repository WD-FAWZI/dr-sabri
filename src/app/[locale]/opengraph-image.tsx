import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'د. صبري أبو قرون - مرشد طبي';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '80px',
                    fontFamily: 'Arial, sans-serif',
                    position: 'relative',
                }}
            >
                {/* Decorative Glow */}
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '20%',
                        width: '400px',
                        height: '400px',
                        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)',
                        filter: 'blur(60px)',
                    }}
                />

                {/* Left Side - Doctor's Image Placeholder */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '350px',
                        height: '350px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #6366f1 0%, #14b8a6 100%)',
                        border: '8px solid rgba(99, 102, 241, 0.5)',
                        boxShadow: '0 0 60px rgba(99, 102, 241, 0.4)',
                        fontSize: 120,
                        color: 'white',
                    }}
                >
                    👨‍⚕️
                </div>

                {/* Right Side - Text */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        flex: 1,
                        paddingLeft: '60px',
                        textAlign: 'right',
                    }}
                >
                    <div
                        style={{
                            fontSize: 72,
                            fontWeight: 'bold',
                            color: 'white',
                            marginBottom: 20,
                            lineHeight: 1.2,
                        }}
                    >
                        د. صبري أبو قرون
                    </div>
                    <div
                        style={{
                            fontSize: 42,
                            color: '#5eead4',
                            fontWeight: 'normal',
                            lineHeight: 1.4,
                        }}
                    >
                        مرشد طبي - فن ربط المعلومات
                    </div>
                    <div
                        style={{
                            fontSize: 28,
                            color: '#94a3b8',
                            marginTop: 20,
                        }}
                    >
                        Medical Mentor
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
