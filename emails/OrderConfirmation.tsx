import {
  Html, Head, Body, Container, Section, Row, Column,
  Heading, Text, Button, Hr, Img,
} from '@react-email/components'
import type { OrderItem } from '@/types/database'

interface OrderConfirmationProps {
  customerName: string
  orderId: string
  items: OrderItem[]
  totalArs: number
  isSubscription: boolean
  estimatedDelivery: string
}

const formatARS = (cents: number) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  }).format(cents / 100)

export function OrderConfirmation({
  customerName,
  orderId,
  items,
  totalArs,
  isSubscription,
  estimatedDelivery,
}: OrderConfirmationProps) {
  return (
    <Html lang="es">
      <Head />
      <Body style={{ backgroundColor: '#080c0a', fontFamily: 'system-ui, sans-serif' }}>
        <Container style={{ maxWidth: '560px', margin: '0 auto', padding: '40px 24px' }}>

          {/* Logo */}
          <Section style={{ textAlign: 'center', marginBottom: '40px' }}>
            <Text style={{
              fontFamily: 'Georgia, serif',
              fontSize: '28px',
              fontWeight: '900',
              letterSpacing: '0.08em',
              color: '#e8ede9',
              margin: 0,
            }}>
              NUV<span style={{ color: '#4cba7a' }}>E</span>N
            </Text>
          </Section>

          {/* Main card */}
          <Section style={{
            backgroundColor: '#141f1a',
            borderRadius: '20px',
            border: '1px solid rgba(100,200,140,0.15)',
            padding: '36px',
            marginBottom: '24px',
          }}>
            {/* Header */}
            <Text style={{ fontSize: '40px', textAlign: 'center', margin: '0 0 16px' }}>
              ✓
            </Text>
            <Heading style={{
              color: '#e8ede9',
              fontSize: '24px',
              fontWeight: '800',
              textAlign: 'center',
              margin: '0 0 8px',
            }}>
              Protocolo confirmado
            </Heading>
            <Text style={{
              color: '#8fa898',
              textAlign: 'center',
              margin: '0 0 32px',
              fontSize: '15px',
            }}>
              Hola {customerName}, tu pedido está en proceso.
            </Text>

            <Hr style={{ borderColor: 'rgba(255,255,255,0.07)', margin: '0 0 24px' }} />

            {/* Order items */}
            {items.map((item, i) => (
              <Row key={i} style={{ marginBottom: '16px' }}>
                <Column style={{ width: '44px' }}>
                  <Text style={{ fontSize: '28px', margin: 0 }}>
                    {getPackIcon(item.pack_id)}
                  </Text>
                </Column>
                <Column>
                  <Text style={{ color: '#e8ede9', fontWeight: '700', margin: '0 0 2px', fontSize: '15px' }}>
                    Pack {item.pack_name}
                  </Text>
                  <Text style={{ color: '#8fa898', margin: 0, fontSize: '13px' }}>
                    {item.is_subscription ? 'Suscripción mensual' : 'Compra única'} × {item.quantity}
                  </Text>
                </Column>
                <Column style={{ textAlign: 'right' }}>
                  <Text style={{ color: '#4cba7a', fontWeight: '700', margin: 0, fontSize: '15px' }}>
                    {formatARS(item.unit_price_ars * item.quantity)}
                  </Text>
                </Column>
              </Row>
            ))}

            <Hr style={{ borderColor: 'rgba(255,255,255,0.07)', margin: '16px 0' }} />

            {/* Total */}
            <Row>
              <Column>
                <Text style={{ color: '#8fa898', margin: 0, fontSize: '14px' }}>Total</Text>
              </Column>
              <Column style={{ textAlign: 'right' }}>
                <Text style={{ color: '#e8ede9', fontWeight: '800', fontSize: '22px', margin: 0 }}>
                  {formatARS(totalArs)}
                </Text>
              </Column>
            </Row>

            {isSubscription && (
              <Text style={{
                color: '#4cba7a',
                fontSize: '13px',
                textAlign: 'center',
                marginTop: '12px',
                backgroundColor: 'rgba(76,186,122,0.08)',
                padding: '10px 16px',
                borderRadius: '8px',
              }}>
                Se renovará automáticamente cada 30 días. Podés pausar o cancelar en cualquier momento.
              </Text>
            )}
          </Section>

          {/* Delivery info */}
          <Section style={{
            backgroundColor: '#0d1210',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.07)',
            padding: '24px',
            marginBottom: '24px',
          }}>
            <Text style={{ color: '#5a7066', fontSize: '12px', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 12px' }}>
              Información de envío
            </Text>
            <Text style={{ color: '#8fa898', fontSize: '14px', margin: '0 0 4px' }}>
              📦 Envío por OCA o Correo Argentino
            </Text>
            <Text style={{ color: '#8fa898', fontSize: '14px', margin: '0 0 4px' }}>
              🗓 Entrega estimada: <strong style={{ color: '#e8ede9' }}>{estimatedDelivery}</strong>
            </Text>
            <Text style={{ color: '#5a7066', fontSize: '12px', margin: '8px 0 0' }}>
              N° de pedido: {orderId}
            </Text>
          </Section>

          {/* How to take */}
          <Section style={{
            backgroundColor: '#141f1a',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.07)',
            padding: '24px',
            marginBottom: '24px',
          }}>
            <Text style={{ color: '#5a7066', fontSize: '12px', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 12px' }}>
              Guía rápida de uso
            </Text>
            {[
              { icon: '🌅', text: 'Packs de energía y cerebro: tomalos en la mañana o mediodía.' },
              { icon: '🌙', text: 'Pack bienestar mental: ideal tomarlo por la noche.' },
              { icon: '💪', text: 'Pack físico: con o después de entrenar, o con la comida.' },
              { icon: '📅', text: 'Los efectos se acumulan — mantené la rutina al menos 8 semanas.' },
            ].map(({ icon, text }, i) => (
              <Text key={i} style={{ color: '#8fa898', fontSize: '14px', margin: '0 0 8px' }}>
                {icon} {text}
              </Text>
            ))}
          </Section>

          {/* CTA */}
          <Section style={{ textAlign: 'center', marginBottom: '32px' }}>
            <Button
              href="https://nuven.com.ar"
              style={{
                backgroundColor: '#4cba7a',
                color: '#000',
                fontWeight: '700',
                padding: '14px 32px',
                borderRadius: '100px',
                fontSize: '15px',
                textDecoration: 'none',
              }}
            >
              Explorar más sobre tu protocolo →
            </Button>
          </Section>

          {/* Disclaimer */}
          <Text style={{ color: '#5a7066', fontSize: '11px', textAlign: 'center', lineHeight: '1.6' }}>
            Los suplementos NUVEN son productos dietarios registrados ante ANMAT.
            No son medicamentos. Si tenés consultas médicas, consultá con tu profesional de salud.
            Para soporte: hola@nuven.com.ar
          </Text>

          <Text style={{ color: '#5a7066', fontSize: '11px', textAlign: 'center', marginTop: '16px' }}>
            © {new Date().getFullYear()} NUVEN — nuven.com.ar
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

function getPackIcon(packId: string): string {
  const icons: Record<string, string> = {
    longevidad: '🌿',
    energia: '⚡',
    cerebro: '🧠',
    fisico: '💪',
    hormonas: '⚖️',
    'bienestar-mental': '🌊',
  }
  return icons[packId] ?? '📦'
}

export default OrderConfirmation
